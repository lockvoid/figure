import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { Main, Protected, Form, Submissions } from './containers/index';
import { Signin, Signup, Logout } from './components/auth/index';
import { FormsIndexRedirect, FormTabsIndexRedirect, NewForm, EditForm, SetupForm, FormWebhooks } from './components/forms/index';
import { ShowSubmission } from './components/submissions/index';
import { NotFound } from './components/pages/index';
import { configureStore } from './store/configure_store';
import { auth } from './services/index';

const store = configureStore();

const entry = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <Route path="signin" component={Signin} onEnter={auth.canActivate(store, { authRequired: false })} />
        <Route path="signup" component={Signup} onEnter={auth.canActivate(store, { authRequired: false })} />
        <Route path="logout" component={Logout} />

        <Route component={Protected} onEnter={auth.canActivate(store, { authRequired: true })}>
          <IndexRedirect to="/forms" />

          <Route path="forms">
            <IndexRoute component={FormsIndexRedirect} />

            <Route path="new" component={NewForm} />

            <Route path=":formId" component={Form}>
              <IndexRoute component={FormTabsIndexRedirect} />

              <Route path="edit" component={EditForm} />
              <Route path="setup" component={SetupForm} />
              <Route path="webhooks" component={FormWebhooks} />

              <Route path="submissions" component={Submissions}>
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
