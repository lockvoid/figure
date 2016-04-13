import { Reducer, combineReducers } from 'redux';
import { syncronizeArray } from '../utils/syncronize_array';
import { UNSUBSCRIBE_SUBMISSIONS } from '../actions/index';

export const submissions = combineReducers(Object.assign({}, syncronizeArray('SUBMISSIONS', UNSUBSCRIBE_SUBMISSIONS)));
