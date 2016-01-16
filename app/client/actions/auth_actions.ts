import { routeActions } from 'redux-simple-router'
import { ThunkInterface } from 'redux-thunk';
import * as Firebase from 'firebase';

export const LOGIN_WITH_GITHUB = 'LOGIN_WITH_GITHUB';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGGET_OUT = 'LOGGET_OUT';
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';

export function bindAuth(): ThunkInterface {
  return (dispatch: any, getState: any) => {
    const { firebase } = getState();

    firebase.onAuth((authData) => {
      dispatch({ type: SET_AUTH_STATUS, authData });
    });
  };
}

export function loginWithGithub() {
  return (dispatch: any, getState: any) => {
    const { firebase, routing } = getState();
    firebase.authWithOAuthPopup('github', (authError, authData) => {
      if (authError) {
        dispatch({ type: LOGIN_FAILED, authError });
      } else {

        if (routing.location.state && routing.location.state.nextPathname) {
          dispatch(routeActions.push(routing.location.state.nextPathname));
        } else {
          dispatch(routeActions.push('/'));
        }
      }
    });
  };
}

export function logout() {
  return (dispatch: any, getState: any) => {
    const { firebase } = getState();

    firebase.unauth();
    dispatch(routeActions.push('/login'));
  }
}
