import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { syncHistory, routeReducer } from 'redux-simple-router';
import { createHistory } from 'history';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
let thunk = require('redux-thunk');

import { firebase } from './reducers/firebase';
import { forms } from './reducers/forms';
import { Main } from './components/main';
import { ShowForm } from './components/forms';

const history = createHistory();

const createCustomStore = applyMiddleware(thunk, syncHistory(history))(createStore);

const store = createCustomStore(combineReducers({ firebase, forms, routing: routeReducer }));

const boot = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
        <Route path="forms/:formId" component={ShowForm} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(boot, document.getElementById('app'));
