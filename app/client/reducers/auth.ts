import { Reducer } from 'redux';

import { LOGIN_WITH_GITHUB, SET_AUTH_STATUS, LOGIN_FAILED } from '../actions/auth';

const initialState = {
  loggedIn: null,
  authError: null,
  authData: null,
}

export const auth: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_STATUS:
      return setAuthStatus(state, action.authData);
    case LOGIN_FAILED:
      return loginFailed(state, action.authError);
    default:
      return state;
  }
}

function setAuthStatus(state, authData) {
  if (authData) {
    return Object.assign({}, state, { loggedIn: true, authData });
  }

  return Object.assign({}, state, { loggedIn: false });
}

function loginFailed(state, authError) {
  return Object.assign({}, state, { authError });
}

