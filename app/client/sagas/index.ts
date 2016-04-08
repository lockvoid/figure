import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { formsFlow } from './forms';

export function* sagas() {
  yield [
    fork(authFlow),
    fork(formsFlow),
  ]
}
