import { Reducer, combineReducers } from 'redux';
import { syncronizeArray } from '../utils/syncronize_array';
import { UNWATCH_FORMS } from '../actions/index';

export const forms = combineReducers(Object.assign({}, syncronizeArray('FORMS', UNWATCH_FORMS)));
