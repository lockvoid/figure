import { AUTH_TOKEN_KEY } from '../actions/index';
import { AuthToken } from '../lib/auth_token';
import { FetchError } from '../lib/errors/fetch_error';
import { createCookie, clearCookie } from './cookie';

export function canActivate(store, { authRequired } : { authRequired: boolean }) {
  return (nextState, replaceState, performState) => {
    const check = (unsubscribe = null) => {
      const { auth } = store.getState();

      if (auth === null) {
        return false;
      }

      unsubscribe && unsubscribe();

      if (authRequired) {
        auth.token || replaceState({ pathname: '/signin', state: { nextPathname: nextState.location.pathname } });
      } else {
        auth.token && replaceState({ pathname: '/forms' });
      }

      performState()
    }

    if (check() === false) {
      let unsubscribe = store.subscribe(() => check(unsubscribe));
    }
  }
}

export function storeToken(token: string): AuthToken {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  return retrieveToken();
}

export function retrieveToken(): AuthToken {
  try {
    return new AuthToken(localStorage.getItem(AUTH_TOKEN_KEY));
  } catch (error) {
    return null;
  }
}

export function purgeToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function expireToken(expiresIn: number): Promise<boolean> {
  return new Promise<boolean>(resolve => setTimeout(() => resolve(true), Math.min(expiresIn, 2147483647)));
}

export function createAuthCookie(token: AuthToken) {
  createCookie('figureAuth', true, Date.now() + token.expiresIn);
}

export function purgeAuthCookie() {
  clearCookie('figureAuth');
}
