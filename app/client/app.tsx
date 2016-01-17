import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { syncHistory, routeReducer } from 'redux-simple-router';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import * as React from 'react';
import * as Firebase from 'firebase';
import * as ReactDOM from 'react-dom';

let thunk = require('redux-thunk');

import { authRequired } from './utils/auth';
import { setFirebase } from './actions/firebase';
import { bindAuth } from './actions/auth';
import { firebase } from './reducers/firebase';
import { forms } from './reducers/forms';
import { auth } from './reducers/auth';
import { Main } from './components/main';
import { AppLogin } from './components/shared/app_login';
import { AppLogout } from './components/shared/app_logout';
import { AppHome } from './components/shared/app_home';
import { ShowForm, NewForm, FormSettings } from './components/forms';
import { Dashboard } from './components/main';

import './utils/polyfills';

const createCustomStore = applyMiddleware(thunk, syncHistory(browserHistory))(createStore);

const store = createCustomStore(combineReducers({ firebase, forms, auth, routing: routeReducer,
  form: formReducer
}));

store.dispatch(setFirebase(new Firebase('https://figure-dev.firebaseio.com')));
store.dispatch(bindAuth());

const boot = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <Route path="login" component={AppLogin} />
        <Route path="logout" component={AppLogout} />

        <Route component={Dashboard} onEnter={authRequired(store)}>
          <IndexRoute component={AppHome} />

          <Route path="forms/new" component={NewForm} />
          <Route path="forms/:formId" component={ShowForm}>
            <Route path="settings" component={FormSettings} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(boot, document.getElementById('app'));
