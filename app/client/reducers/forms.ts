import { Reducer } from 'redux';
import { List, Map } from 'immutable';

import { firebaseArray } from './firebase';
import { RESET_FORMS, FORMS_READY, FORM_ADDED, FORM_CHANGED, FORM_MOVED, FORM_REMOVED } from '../actions/forms';

export const forms = firebaseArray([RESET_FORMS, FORMS_READY, FORM_ADDED, FORM_CHANGED, FORM_MOVED, FORM_REMOVED], serializeForm);

function serializeForm(snapshot: any): any {
  let val = snapshot.val();
  val.$key = snapshot.key();

  return val;
}

export const findForm = (state, formId: string) => {
  return state.value.find(form => form.$key === formId);
}
