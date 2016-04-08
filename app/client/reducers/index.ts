import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { theron } from './theron';
import { auth } from './auth';
import { forms } from './forms';

export const reducers = combineReducers({ auth, forms, theron, routing, form });
