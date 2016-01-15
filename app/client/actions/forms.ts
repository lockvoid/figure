import { ThunkInterface } from 'redux-thunk';
import { routeActions } from 'redux-simple-router';

export const CHILD_ADDED = 'CHILD_ADDED';
export const CHILD_CHANGED = 'CHILD_CHANGED';
export const CHILD_MOVED = 'CHILD_MOVED';
export const CHILD_REMOVED = 'CHILD_REMOVED';
export const VALUE = 'VALUE';
export const FORMS_PATH = 'forms2';
export const REMOVE_FORM_AND_REDIRECT = 'REMOVE_FORM_AND_REDIRECT';

export function bindForms(): ThunkInterface {
  return (dispatch: any, getState: any) => {
    const { firebase } = getState();

    let ref = firebase.child('forms2').orderByChild('name');

    ref.on(CHILD_ADDED.toLowerCase(), (snapshot: any, prevChild: string) => {
      dispatch({ type: CHILD_ADDED, snapshot: snapshot, prevChild });
    });

    ref.on(CHILD_CHANGED.toLowerCase(), (snapshot: any) => {
      dispatch({ type: CHILD_CHANGED, snapshot: snapshot });
    });

    ref.on(CHILD_MOVED.toLowerCase(), (snapshot: any, prevChild: string) => {
      dispatch({ type: CHILD_MOVED, snapshot: snapshot, prevChild });
    });

    ref.on(CHILD_REMOVED.toLowerCase(), (snapshot: any) => {
      dispatch({ type: CHILD_REMOVED, snapshot: snapshot });
    });
  };
}

export function addForm(form: any) {
  return (dispatch: any, getState: any) => {
    const { firebase } = getState();

    let ref = firebase.child(FORMS_PATH).push(form);
    dispatch(routeActions.push(`/forms/${ref.key()}`));
  }
}

export function removeFormAndRedirect(id: string) {
  return (dispatch: any, getState: any) => {
    const { firebase, forms } = getState();

    let currFormIndex = forms.findIndex((form: any) => form.$key == id);

    if (currFormIndex !== -1) {
      var nextFormId: string = null;

      if (currFormIndex + 1 < forms.size) {
        nextFormId = forms.get(currFormIndex + 1).$key;
      } else if (currFormIndex - 1 >= 0) {
        nextFormId = forms.get(currFormIndex - 1).$key;
      }

      firebase.child(FORMS_PATH).child(id).remove();

      if (nextFormId !== null) {
        dispatch(routeActions.push(`/forms/${nextFormId}`));
      } else {
        dispatch(routeActions.push('/forms/new'));
      }
    }
  }
}
