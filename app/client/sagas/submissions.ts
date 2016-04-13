import { routeActions } from 'react-router-redux';
import { take, race, call, put, fork, select } from 'redux-saga/effects';
import { Theron, ROW_ADDED, ROW_CHANGED, ROW_REMOVED } from 'theron';
import { wrapObservable } from '../utils/wrap_observable';
import { REDIRECT_TO_FIRST_SUBMISSION, DELETE_SUBMISSION, STREAM_SUBMISSIONS, UNSUBSCRIBE_SUBMISSIONS } from '../actions/index';

function* watchDelete() {
  while (true) {
    const { id, formId } = yield take(DELETE_SUBMISSION);
    const { auth: { api } } = yield select();

    try {
      const [{ payload: { prevRowId } }] = yield [
        take(action => action.query === 'SUBMISSIONS' && action.type === ROW_REMOVED && action.payload.row.id === id),
        api.deleteSubmission(id),
      ];

      const { submissions } = yield select();

      if (prevRowId) {
        const nextRow = submissions.rows.get(submissions.rows.findIndex(row => row.id === prevRowId) + 1);

        var redirectTo = nextRow ? nextRow.id : prevRowId;
      } else {
        var redirectTo = submissions.rows.isEmpty() ? '' : submissions.rows.first().id;
      }

      yield put(routeActions.push(`forms/${formId}/submissions/${redirectTo}`));
    } catch(error) {
      console.log(error);
    }
  }
}

function* indexRedirect() {
  while (true) {
    yield take(REDIRECT_TO_FIRST_SUBMISSION);

    const { submissions, params: { formId } } = yield select();

    if (submissions.rows.isEmpty()) {
      var redirectTo = `forms/${formId}/submissions`;
    } else {
      var redirectTo = `forms/${formId}/${submissions.rows.get(0).id}`;
    }

    yield put(routeActions.push(redirectTo));
  }
}

function* streamSubmissions() {
  while (true) {
    const { formId } = yield take(STREAM_SUBMISSIONS);
    const { theron } = yield select();

    try {
      for (let next of wrapObservable(theron.ref.watch(`/api/forms/${formId}/submissions`))) {
        const { action } = yield race({ action: next, overwise: take(UNSUBSCRIBE_SUBMISSIONS) });

        if (action) {
          yield put(Object.assign({}, action, { query: 'SUBMISSIONS' }));
        } else {
          break;
        }
      }
    } catch(error) {
      console.log(error);
    }
  }
}

export function* submissionsFlow() {
  yield [
    fork(watchDelete),
    fork(streamSubmissions),
  ]
}
