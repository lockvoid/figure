import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { AppHome, AppMain, AppSignin, AppSignup, AppLogout, AppProtected } from './components/shared/index';
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

          <Route path="forms" component={AppHome} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(entry, document.getElementById('app'));


// import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
// import { syncHistory, routeReducer } from 'react-router-redux';
// import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
// import { Provider } from 'react-redux';
// import { reducer as formReducer } from 'redux-form';
//
// import * as React from 'react';
// import * as Firebase from 'firebase';
// import * as ReactDOM from 'react-dom';
//
// let thunk = require('redux-thunk');
//
// import { setFirebase } from './actions/firebase';
// import { bindAuth } from './actions/auth';
// import { firebase } from './reducers/firebase';
// import { forms } from './reducers/forms';
// import { webhook } from './reducers/webhooks';
// import { submissions } from './reducers/submissions';
// import { auth, authRequired } from './reducers/auth';
// import { AppMain, AppProtected, AppLogin, AppLogout, AppHome } from './components/shared';
// import { ShowForm, NewForm, FormSubmissions, SetupForm, EditForm, FormWebhooks } from './components/forms';
// import { ShowSubmission } from './components/submissions';
// import { EditAccount } from './components/account';
//
// import '../../lib/polyfills';
//
// const createCustomStore = applyMiddleware(thunk, syncHistory(browserHistory))(createStore);
//
// const store = createCustomStore(combineReducers({ firebase, forms, submissions, webhook, auth, routing: routeReducer,
//   form: formReducer
// }));
//
// store.dispatch(setFirebase(new Firebase('/* @echo FIREBASE_URL */')));
// store.dispatch(bindAuth());
//
// const boot = (
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Route path="/" component={AppMain}>
//         <Route path="login" component={AppLogin} />
//         <Route path="logout" component={AppLogout} />
//
//         <Route component={AppProtected} onEnter={authRequired(store)}>
//           <IndexRoute component={AppHome} />
//
//           <Route path="forms">
//             <Route path="new" component={NewForm} />
//
//             <Route path=":formId" component={ShowForm}>
//               <IndexRedirect to="submissions" />
//
//               <Route path="setup" component={SetupForm} />
//               <Route path="edit" component={EditForm} />
//               <Route path="webhooks" component={FormWebhooks} />
//
//               <Route path="submissions" component={FormSubmissions}>
//                 <Route path=":submissionId" component={ShowSubmission} />
//               </Route>
//             </Route>
//           </Route>
//
//           <Route path="account" component={EditAccount} />
//         </Route>
//       </Route>
//     </Router>
//   </Provider>
// );
//
// ReactDOM.render(boot, document.getElementById('app'));
