import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { formsFlow } from './forms';
import { submissionsFlow } from './submissions';

export function* sagas() {
  yield [fork(authFlow), fork(formsFlow), fork(submissionsFlow)]
}
