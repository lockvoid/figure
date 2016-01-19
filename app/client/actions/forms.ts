import { ThunkInterface } from 'redux-thunk';
import { routeActions } from 'redux-simple-router';
import { FormAttrs } from '../../../lib/models/form.ts';
import * as Firebase from 'firebase';

export const RESET_FORMS = 'RESET_FORMS';
export const FORMS_READY = 'FORMS_READY';
export const FORM_ADDED = 'FORM_ADDED';
export const FORM_CHANGED = 'FORM_CHANGED';
export const FORM_MOVED = 'FORM_MOVED';
export const FORM_REMOVED = 'FORM_REMOVED';
export const REMOVE_FORM_AND_REDIRECT = 'REMOVE_FORM_AND_REDIRECT';

function formsRef(state): Firebase {
  const { firebase, auth } = state;

  return firebase.child('forms').child(auth.authData.uid);
}

const callbacks = {};

export function bindForms(): ThunkInterface {
  return (dispatch: any, getState: any) => {
    let ref = formsRef(getState()).orderByChild('name');

    setTimeout(() => {
      callbacks[FORMS_READY] = ref.once('value', (snapshot: any) => {
        dispatch({ type: FORMS_READY });
      });

      callbacks[FORM_ADDED] = ref.on('child_added', (snapshot: any, prevChild: string) => {
        dispatch({ type: FORM_ADDED, snapshot: snapshot, prevChild });
      });

      callbacks[FORM_CHANGED] = ref.on('child_changed', (snapshot: any) => {
        dispatch({ type: FORM_CHANGED, snapshot: snapshot });
      });

      callbacks[FORM_MOVED] = ref.on('child_moved', (snapshot: any, prevChild: string) => {
        dispatch({ type: FORM_MOVED, snapshot: snapshot, prevChild });
      });

      callbacks[FORM_REMOVED] = ref.on('child_removed', (snapshot: any) => {
        dispatch({ type: FORM_REMOVED, snapshot: snapshot });
      });
    });
  };
}

export function unbindForms(): ThunkInterface {
  return (dispatch: any, getState: any) => {
    let ref = formsRef(getState());

    ref.off('value', callbacks[FORMS_READY]);
    ref.off('child_added', callbacks[FORM_ADDED]);
    ref.off('child_changed', callbacks[FORM_CHANGED]);
    ref.off('child_moved', callbacks[FORM_MOVED]);
    ref.off('child_removed', callbacks[FORM_REMOVED]);

    dispatch({ type: RESET_FORMS })
  }
}

export function addForm(form: FormAttrs) {
  return (dispatch: any, getState: any) => {
    let ref = formsRef(getState()).push(form);
    console.log(form);

    dispatch(routeActions.push(`/forms/${ref.key()}/setup`));
  }
}

export function updateForm(id: string, attrs: FormAttrs) {
  return (dispatch: any, getState: any) => {
    formsRef(getState()).child(id).update(attrs);
  }
}

export function removeFormAndRedirect(id: string) {
  return (dispatch: any, getState: any) => {
    const { firebase, forms } = getState();

    let { value } = forms;

    let currFormIndex = value.findIndex((form: any) => form.$key == id);

    if (currFormIndex !== -1) {
      var nextFormId: string = null;

      if (currFormIndex + 1 < value.size) {
        nextFormId = value.get(currFormIndex + 1).$key;
      } else if (currFormIndex - 1 >= 0) {
        nextFormId = value.get(currFormIndex - 1).$key;
      }

      formsRef(getState()).child(id).remove();
      firebase.child(`submissions/${id}`).remove();

      if (nextFormId !== null) {
        dispatch(routeActions.push(`/forms/${nextFormId}`));
      } else {
        dispatch(routeActions.push('/forms/new'));
      }
    }
  }
}
