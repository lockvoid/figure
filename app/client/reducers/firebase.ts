import { Reducer } from 'redux';

import { SET_FIREBASE_REF } from '../actions/firebase';

export const firebase: Reducer = (state = null, action) => {
  switch (action.type) {
    case SET_FIREBASE_REF:
      return action.value;
    default:
      return state;
  }
}
