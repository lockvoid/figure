import { Reducer } from 'redux';
import { SIGNIN_SUCCESS, SIGNIN_FAILURE, LOGOUT_SUCCESS } from '../actions/index';
import { Api } from '../lib/api';

export const auth: Reducer = (state = null, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { token: action.token, api: new Api(action.token.toString()) };
    case SIGNIN_FAILURE:
      return { token: null, reason: action.reason };
    case LOGOUT_SUCCESS:
      return { token: null };
    default:
      return state;
  }
}
