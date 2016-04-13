import { AuthToken } from '../lib/auth_token';

export const SIGNIN = 'FG:REQUEST_SIGNIN';
export const SIGNIN_SUCCESS = 'FG:SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'FG:SIGNIN_FAILURE';
export const SIGNUP = 'FG:REQUEST_SIGNUP';
export const SIGNUP_SUCCESS = 'FG:SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'FG:SIGNUP_FAILURE';
export const LOGOUT = 'FG:REQUEST_LOGOUT';
export const LOGOUT_SUCCESS = 'FG:LOGOUT_SUCCESS';
export const AUTH_TOKEN_KEY = 'FG:AUTH_TOKEN_KEY';

export const REDIRECT_TO_FIRST_FORM = 'FG:REDIRECT_TO_FIRST_FORM';
export const CREATE_FORM = 'FG:CREATE_FORM';
export const UPDATE_FORM = 'FG:UPDATE_FORM';
export const DELETE_FORM = 'FG:DELETE_FORM';
export const STREAM_FORMS = 'FG:STREAM_FORMS';
export const UNSUBSCRIBE_FORMS = 'FG:UNSUBSCRIBE_FORMS';

export const REDIRECT_TO_FIRST_SUBMISSION = 'FG:REDIRECT_TO_FIRST_SUBMISSION';
export const DELETE_SUBMISSION = 'FG:DELETE_SUBMISSIONS';
export const STREAM_SUBMISSIONS = 'FG:STREAM_SUBMISSIONS';
export const UNSUBSCRIBE_SUBMISSIONS = 'FG:UNSUBSCRIBE_SUBMISSIONS';

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

export function streamForms() {
  return { type: STREAM_FORMS };
}

export function unsubscribeForms() {
  return { type: UNSUBSCRIBE_FORMS };
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
