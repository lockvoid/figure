import { routeActions } from 'react-router-redux';
import { take, race, call, put, fork, select } from 'redux-saga/effects';
import { Theron, ROW_ADDED, ROW_CHANGED, ROW_REMOVED } from 'theron';
import { wrapObservable } from '../utils/wrap_observable';
import { REDIRECT_TO_FIRST_FORM, CREATE_FORM, UPDATE_FORM, DELETE_FORM, WATCH_FORMS, UNWATCH_FORMS } from '../actions/index';

function* watchCreate() {
  while (true) {
    const { payload, resolve, reject } = yield take(CREATE_FORM);
    const { api } = yield select(state => state.auth);

    try {
      const { id } = yield api.createForm(payload);
      const { forms } = yield select();

      if (!forms.rows.some(form => form.id === id)) {
        yield take(action => action.query === 'FORMS' && action.type === ROW_ADDED && action.payload.row.id === id);
      }

      resolve();

      yield put(routeActions.push(`/forms/${id}`));
    } catch(error) {
      typeof error.message === 'object' ? reject(error.message) : reject({ _error: error.message });
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { id, payload, resolve, reject } = yield take(UPDATE_FORM);
    const { auth: { api } } = yield select();

    try {
      yield [
        take(action => action.query === 'FORMS' && action.type === ROW_CHANGED && action.payload.row.id === id),
        api.updateForm(id, payload),
      ];

      resolve();
    } catch(error) {
      typeof error.message === 'object' ? reject(error.message) : reject({ _error: error.message });
    }
  }
}

function* watchDelete() {
  while (true) {
    const { id } = yield take(DELETE_FORM);
    const { auth: { api } } = yield select();

    try {
      const [{ payload: { prevRowId } }] = yield [
        take(action => action.query === 'FORMS' && action.type === ROW_REMOVED && action.payload.row.id === id),
        api.deleteForm(id),
      ];

      const { forms } = yield select();

      if (prevRowId) {
        const nextRow = forms.rows.get(forms.rows.findIndex(row => row.id === prevRowId) + 1);

        var redirectTo = nextRow ? nextRow.id : prevRowId;
      } else {
        var redirectTo = forms.rows.isEmpty() ? 'new' : forms.rows.first().id;
      }

      yield put(routeActions.push(`forms/${redirectTo}`));
    } catch(error) {
      console.log(error);
    }
  }
}

function* indexRedirect() {
  while (true) {
    yield take(REDIRECT_TO_FIRST_FORM);

    const { forms } = yield select();

    if (forms.rows.isEmpty()) {
      var redirectTo = 'forms/new';
    } else {
      var redirectTo = `forms/${forms.rows.get(0).id}`;
    }

    yield put(routeActions.push(redirectTo));
  }
}

function* streamForms() {
  while (true) {
    yield take(WATCH_FORMS);

    const { theron } = yield select();

    try {
      for (let next of wrapObservable(theron.ref.watch('/api/forms'))) {
        const { action } = yield race({ action: next, overwise: take(UNWATCH_FORMS) });

        if (action) {
          yield put(Object.assign({}, action, { query: 'FORMS' }));
        } else {
          break;
        }
      }
    } catch(error) {
      console.log(error);
    }
  }
}

export function* formsFlow() {
  yield [
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
    fork(indexRedirect),
    fork(streamForms),
  ]
}

