import { Reducer, combineReducers } from 'redux';
import { syncronizeArray } from '../utils/syncronize_array';
import { UNSUBSCRIBE_FORMS } from '../actions/index';

export const forms = combineReducers(Object.assign({}, syncronizeArray('FORMS', UNSUBSCRIBE_FORMS)));
