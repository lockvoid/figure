import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { applyMiddleware, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga'

import { reducers } from '../reducers/index';
import { sagas } from '../sagas/index'

const middlewares = applyMiddleware(
  createSagaMiddleware(sagas), syncHistory(browserHistory)
);

export function configureStore(initialState?) {
  return createStore(reducers, initialState, <any>compose(middlewares, window.devToolsExtension ? window.devToolsExtension() : f => f));
}
