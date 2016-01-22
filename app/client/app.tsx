import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { syncHistory, routeReducer } from 'redux-simple-router';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import * as React from 'react';
import * as Firebase from 'firebase';
import * as ReactDOM from 'react-dom';

let thunk = require('redux-thunk');

import { setFirebase } from './actions/firebase';
import { bindAuth } from './actions/auth';
import { firebase } from './reducers/firebase';
import { forms } from './reducers/forms';
import { submissions } from './reducers/submissions';
import { auth, authRequired } from './reducers/auth';
import { AppMain, AppProtected, AppLogin, AppLogout, AppHome } from './components/shared';
import { ShowForm, NewForm, FormSubmissions, SetupForm, EditForm } from './components/forms';
import { ShowSubmission } from './components/submissions';
import { EditAccount } from './components/account';

import '../../lib/polyfills';

const createCustomStore = applyMiddleware(thunk, syncHistory(browserHistory))(createStore);

const store = createCustomStore(combineReducers({ firebase, forms, submissions, auth, routing: routeReducer,
  form: formReducer
}));

store.dispatch(setFirebase(new Firebase('/* @echo FIREBASE_URL */')));
store.dispatch(bindAuth());

const boot = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppMain}>
        <Route path="login" component={AppLogin} />
        <Route path="logout" component={AppLogout} />

        <Route component={AppProtected} onEnter={authRequired(store)}>
          <IndexRoute component={AppHome} />

          <Route path="forms">
            <Route path="new" component={NewForm} />

            <Route path=":formId" component={ShowForm}>
              <IndexRedirect to="submissions" />

              <Route path="setup" component={SetupForm} />
              <Route path="edit" component={EditForm} />

              <Route path="submissions" component={FormSubmissions}>
                <Route path=":submissionId" component={ShowSubmission} />
              </Route>
            </Route>
          </Route>

          <Route path="account" component={EditAccount} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(boot, document.getElementById('app'));
