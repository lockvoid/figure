import { Reducer, combineReducers } from 'redux';

import { SET_AUTH_STATUS, LOGIN_FAILED, USER_VALUE } from '../actions/auth';

const status: Reducer = (state = { loggedIn: null }, action) => {
  switch (action.type) {
    case SET_AUTH_STATUS:
      return setAuthStatus(state, action.authData);
    case LOGIN_FAILED:
      return loginFailed(state, action.authError);
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

function setAuthStatus(state, authData) {
  if (authData) {
    return Object.assign({}, authData, { loggedIn: true });
  }

  return { loggedIn: false };
}

function loginFailed(state, error) {
  error.name = '';

  return { loggedIn: false, error };
}
