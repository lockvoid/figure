import { routeActions } from 'react-router-redux';
import { take, race, call, put, fork, select } from 'redux-saga/effects';
import { SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT, LOGOUT_SUCCESS, AUTH_TOKEN_KEY } from '../actions/index';
import { signinSuccess, signinFailure, signupSuccess, signupFailure, logout, logoutSuccess } from '../actions/index';
import { waitEvent } from '../utils/wait_event';
import { auth } from '../services/index';
import { Api } from '../lib/api';

function* createToken({ email, password }) {
  try {
    const { token } = yield Api.createToken(email, password);

    yield call(storeToken, token, true);
  } catch (error) {
    yield put(signinFailure(error));
  }
}

function* storeToken(tokenHash: string, performRedirect: boolean) {
  const token = auth.storeToken(tokenHash);
  auth.createAuthCookie(token);

  yield put(signinSuccess(token, performRedirect));
}

function* purgeToken(performRedirect) {
  auth.purgeToken();
  auth.purgeAuthCookie();

  yield put(logoutSuccess(performRedirect));
}

function* renewToken() {
  // TODO
}

function* createUser({ email, password, name }) {
  yield fork(function* () {
    const { success } = yield race({ success: take(SIGNUP_SUCCESS), otherwise: take(SIGNUP_FAILURE) });

    if (success) {
      yield call(createToken, { email, password });
    }
  });

  try {
    const user = yield Api.createUser(email, password, name);

    yield put(signupSuccess());
  } catch (error) {
    yield put(signupFailure(error));
  }
}

function* refererPath(otherwise: string) {
  const { state } = yield select(state => state.routing.location);
  return state && state.nextPathname ? state.nextPathname : otherwise;
}

function* watchStorage() {
  while (true) {
    const { key, newValue, oldValue } = yield call(waitEvent, window, 'storage');

    if (key !== AUTH_TOKEN_KEY) {
      continue;
    }

    if (newValue) {
      oldValue ? void 0 : yield call(storeToken, newValue, true);
    } else {
      yield put(logout());
    }
  }
}

function* watchExpiration(expiresIn) {
  const { expired } = yield race({ expired: call(auth.expireToken, expiresIn), overwise: take(LOGOUT) })

  if (expired) {
    yield call(renewToken);
  } else {
    yield call(purgeToken, true);
  }
}

function* redirectOnAuth() {
  while (true) {
    const { signin, logout } = yield race({ signin: take(SIGNIN_SUCCESS), logout: take(LOGOUT_SUCCESS)});

    if (signin) {
      signin.performRedirect && (yield put(routeActions.push(yield call(refererPath, '/'))));
    } else {
      logout.performRedirect && (yield put(routeActions.push('/signin')));
    }
  }
}

function* submitSigninForm(resolve, reject) {
  const { failure } = yield race({ success: take(SIGNIN_SUCCESS), failure: take(SIGNIN_FAILURE)});

  if (failure) {
    typeof failure.reason.message === 'object' ? reject(failure.reason.message) : reject({ _error: failure.reason.message });
  } else {
    resolve();
  }
}

function* submitSignupForm(resolve, reject) {
  const { failure } = yield race({ success: take(SIGNUP_SUCCESS), failure: take(SIGNUP_FAILURE)});

  if (failure) {
    typeof failure.reason.message === 'object' ? reject(failure.reason.message) : reject({ _error: failure.reason.message });
  } else {
    resolve();
  }
}

export function* authFlow() {
  yield fork(watchStorage);
  yield fork(redirectOnAuth);

  while (true) {
    const token = auth.retrieveToken();

    if (token) {
      const state = yield select(state => state.auth);

      if (!state || state.token.toString() !== token.toString()) {
        yield put(signinSuccess(token, false));
      }

      yield call(watchExpiration, token.expiresIn);
    } else {
      yield call(purgeToken, false);
    }

    const { signin, signup } = yield race({ signin: take(SIGNIN), signup: take(SIGNUP), overwise: take(SIGNIN_SUCCESS) });

    if (signin) {
      yield fork(submitSigninForm, signin.resolve, signin.reject);
      yield call(createToken, signin);
      continue;
    }

    if (signup) {
      yield fork(submitSignupForm, signup.resolve, signup.reject);
      yield call(createUser, signup);
      continue;
    }
  }
}
