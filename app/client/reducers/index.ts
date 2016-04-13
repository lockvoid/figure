import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { theron } from './theron';
import { auth } from './auth';
import { forms } from './forms';
import { submissions } from './submissions';

export const reducers = combineReducers({ auth, forms, submissions, theron, routing, form });
