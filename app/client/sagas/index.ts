import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';

export function* sagas() {
  yield [
    fork(authFlow),
  ]
}
