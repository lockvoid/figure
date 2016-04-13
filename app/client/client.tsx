import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { AppHome, AppMain, AppSignin, AppSignup, AppLogout, AppProtected, NotFound } from './components/shared/index';
import { RedirectToFirstForm, RedirectToSubmissions, FormDashboard, NewForm, EditForm, SetupForm } from './components/forms/index';
import { SubmissionsDashboard, ShowSubmission } from './components/submissions/index';
import { configureStore } from './store/configure_store';
import { auth } from './services/index';

const store = configureStore();

const entry = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppMain}>
        <Route path="signin" component={AppSignin} onEnter={auth.canActivate(store, { authRequired: false })} />
        <Route path="signup" component={AppSignup} onEnter={auth.canActivate(store, { authRequired: false })} />
        <Route path="logout" component={AppLogout} />

        <Route component={AppProtected} onEnter={auth.canActivate(store, { authRequired: true })}>
          <IndexRedirect to="/forms" />

          <Route path="forms">
            <IndexRoute component={RedirectToFirstForm} />

            <Route path="new" component={NewForm} />

            <Route path=":formId" component={FormDashboard}>
              <IndexRoute component={RedirectToSubmissions} />

              <Route path="edit" component={EditForm} />
              <Route path="setup" component={SetupForm} />

              <Route path="submissions" component={SubmissionsDashboard}>
                <Route path=":submissionId" component={ShowSubmission} />
              </Route>
            </Route>
          </Route>

          <Route path="*" component={NotFound} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(entry, document.getElementById('app'));
