import { Reducer, combineReducers } from 'redux';

import { SET_AUTH_STATUS, LOGIN_SUCCEED, LOGIN_FAILED, USER_VALUE } from '../actions/auth';

const status: Reducer = (state = { loggedIn: null }, action) => {
  switch (action.type) {
    case SET_AUTH_STATUS:
      return setAuthStatus(state, action.authData);
    case LOGIN_FAILED:
      return loginFailed(state, action.authError);
    case LOGIN_SUCCEED:
      return setAuthCookie(state, action.authData);
    default:
      return state;
  }
}

const user: Reducer = (state = null, action) => {
  switch (action.type) {
    case USER_VALUE:
      return action.snapshot.val();
    default:
      return state;
  }
}

export const auth = combineReducers({ status, user });

export const authRequired = (store) => {
  return (nextState, replaceState, performState) => {
    function check() {
      let status = store.getState().auth.status;

      if (status.loggedIn === false) {
        replaceState({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        })
      }

      if (status.loggedIn !== null) {
        performState();
        return true;
      }

      return false;
    }

    if (check() === false) {
      let unsubscribe = store.subscribe(() => {
        if (check() === true) {
          unsubscribe();
        }
      });
    }
  }
}

const setAuthStatus = (state, authData) => {
  if (authData) {
    return Object.assign({}, authData, { loggedIn: true });
  } else {
    clearCookie('figureAuth');
  }

  return { loggedIn: false };
}

const loginFailed = (state, error) => {
  error.name = '';

  return { loggedIn: false, error };
}

const setAuthCookie = (state, authData) => {
  createCookie('figureAuth', true, (authData.expires - 10) * 1000);
  return state;
}

const createCookie = (name: string, value: any, expiresAt: number) => {
  let expires: string;

  if (expiresAt) {
    expires = `; expires=${new Date(expiresAt).toUTCString()}`;
  } else {
    expires = ''
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
}

const clearCookie = (name: string) => {
  createCookie(name, '', -1);
}
