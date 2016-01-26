import { ThunkInterface } from 'redux-thunk';
import { Dispatch } from 'redux';
import { routeActions } from 'react-router-redux';
import { FormAttrs } from '../../../lib/models/form';
import * as Firebase from 'firebase';

export const RESET_FORMS = 'RESET_FORMS';
export const FORMS_READY = 'FORMS_READY';
export const FORM_ADDED = 'FORM_ADDED';
export const FORM_CHANGED = 'FORM_CHANGED';
export const FORM_MOVED = 'FORM_MOVED';
export const FORM_REMOVED = 'FORM_REMOVED';
export const REMOVE_FORM_AND_REDIRECT = 'REMOVE_FORM_AND_REDIRECT';

const callbacks = {};

export function bindForms(): Function {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();;

    let ref = firebase.child('forms').orderByChild('userId').equalTo(auth.status.uid);

    let comparator = (lhs, rhs): number =>  {
       return lhs.name.localeCompare(rhs.name);
     }

    setTimeout(() => {
      callbacks[FORMS_READY] = ref.once('value', (snapshot: any) => {
        dispatch({ type: FORMS_READY });
      });

      callbacks[FORM_ADDED] = ref.on('child_added', (snapshot: any) => {
        dispatch({ type: FORM_ADDED, snapshot: snapshot, comparator });
      });

      callbacks[FORM_CHANGED] = ref.on('child_changed', (snapshot: any) => {
        dispatch({ type: FORM_CHANGED, snapshot: snapshot });
        dispatch({ type: FORM_MOVED, snapshot: snapshot, comparator });
      });

      callbacks[FORM_REMOVED] = ref.on('child_removed', (snapshot: any) => {
        dispatch({ type: FORM_REMOVED, snapshot: snapshot });
      });
    });
  };
}

export function unbindForms(): Function {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    let ref = firebase.child('forms');

    ref.off('value', callbacks[FORMS_READY]);
    ref.off('child_added', callbacks[FORM_ADDED]);
    ref.off('child_changed', callbacks[FORM_CHANGED]);
    ref.off('child_moved', callbacks[FORM_MOVED]);
    ref.off('child_removed', callbacks[FORM_REMOVED]);

    dispatch({ type: RESET_FORMS })
  }
}

export const addForm = (attrs: FormAttrs): Function => {
  return (dispatch: Dispatch, getState) => {
    const { firebase, auth } = getState();

    let form = firebase.child('forms').push(Object.assign({}, attrs, { userId: auth.status.uid }));

    dispatch(routeActions.push(`/forms/${form.key()}/setup`));
  }
}

export function updateForm(id: string, attrs: FormAttrs): Function {
  return (dispatch: Dispatch, getState) => {
    const { firebase, auth } = getState();

    firebase.child('forms').child(id).update(attrs);
  }
}

export function removeFormAndRedirect(id: string): Function {
  return (dispatch: Dispatch, getState) => {
    const { firebase, forms } = getState();

    let currFormIndex = forms.value.findIndex(form => form.$key == id);

    if (currFormIndex !== -1) {
      var nextFormId: string;

      if (currFormIndex + 1 < forms.value.size) {
        nextFormId = forms.value.get(currFormIndex + 1).$key;
      } else if (currFormIndex - 1 >= 0) {
        nextFormId = forms.value.get(currFormIndex - 1).$key;
      }

      firebase.child('forms').child(id).remove();
      firebase.child('submissions').child(id).remove();

      if (nextFormId) {
        dispatch(routeActions.push(`/forms/${nextFormId}`));
      } else {
        dispatch(routeActions.push('/forms/new'));
      }
    }
  }
}

export const redirectToFirstForm = () => {
  return (dispatch: Dispatch, getState) => {
    let { forms } = getState();

    if (forms.ready && forms.value.size > 0) {
      let firstFormId = forms.value.get(0).$key;

      dispatch(routeActions.push(`/forms/${firstFormId}`));
    } else {
      dispatch(routeActions.push(`/forms/new`));
    }
  }
}
