import { AuthToken } from '../lib/auth_token';

export const SIGNIN = 'TN:REQUEST_SIGNIN';
export const SIGNIN_SUCCESS = 'TN:SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'TN:SIGNIN_FAILURE';
export const SIGNUP = 'TN:REQUEST_SIGNUP';
export const SIGNUP_SUCCESS = 'TN:SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'TN:SIGNUP_FAILURE';
export const LOGOUT = 'TN:REQUEST_LOGOUT';
export const LOGOUT_SUCCESS = 'TN:LOGOUT_SUCCESS';
export const AUTH_TOKEN_KEY = 'TN:AUTH_TOKEN_KEY';

export const REDIRECT_TO_FIRST_FORM = 'TN:REDIRECT_TO_FIRST_FORM';
export const CREATE_FORM = 'TN:CREATE_FORM';
export const UPDATE_FORM = 'TN:UPDATE_FORM';
export const DELETE_FORM = 'TN:DELETE_FORM';
export const WATCH_FORMS = 'TN:WATCH_FORMS';
export const UNWATCH_FORMS = 'TN:UNWATCH_FORMS';

export const REDIRECT_TO_FIRST_SUBMISSION = 'TN:REDIRECT_TO_FIRST_SUBMISSION';
export const DELETE_SUBMISSION = 'TN:DELETE_SUBMISSIONS';
export const STREAM_SUBMISSIONS = 'TN:STREAM_SUBMISSIONS';
export const UNSUBSCRIBE_SUBMISSIONS = 'TN:UNSUBSCRIBE_SUBMISSIONS';

// Auth

export function signin(email: string, password: string, resolve, reject) {
  return { type: SIGNIN, email, password, resolve, reject };
}

export function signinSuccess(token: AuthToken, performRedirect: boolean) {
  return { type: SIGNIN_SUCCESS, token, performRedirect };
}

export function signinFailure(reason: string) {
  return { type: SIGNIN_FAILURE, reason };
}

export function signup(email: string, password: string, name: string, resolve, reject) {
  return { type: SIGNUP, email, password, name, resolve, reject };
}

export function signupSuccess() {
  return { type: SIGNUP_SUCCESS };
}

export function signupFailure(reason: string) {
  return { type: SIGNUP_FAILURE, reason };
}

export function logout() {
  return { type: LOGOUT };
}

export function logoutSuccess(performRedirect: boolean) {
  return { type: LOGOUT_SUCCESS, performRedirect };
}

// Forms

export function redirectToFirstForm() {
  return { type: REDIRECT_TO_FIRST_FORM };
}

export function createForm(payload, resolve, reject) {
  return { type: CREATE_FORM, payload, resolve, reject };
}

export function updateForm(id, payload, resolve, reject) {
  return { type: UPDATE_FORM, id, payload, resolve, reject };
}

export function deleteForm(id: number) {
  return { type: DELETE_FORM, id };
}

export function watchForms() {
  return { type: WATCH_FORMS };
}

export function unwatchForms() {
  return { type: UNWATCH_FORMS };
}

// Submissions

export function deleteSubmission(id: number, formId: number) {
  return { type: DELETE_SUBMISSION, id, formId };
}

export function streamSubmissions(formId: number) {
  return { type: STREAM_SUBMISSIONS, formId };
}

export function unsubscribeSubmissions() {
  return { type: UNSUBSCRIBE_SUBMISSIONS };
}
