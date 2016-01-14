import { ThunkInterface } from 'redux-thunk';

export const CHILD_ADDED = 'CHILD_ADDED';
export const CHILD_CHANGED = 'CHILD_CHANGED';
export const CHILD_MOVED = 'CHILD_MOVED';
export const CHILD_REMOVED = 'CHILD_REMOVED';
export const VALUE = 'VALUE';

export function bindForms(): ThunkInterface {
  return (dispatch: any, getState: any) => {
    const { firebase } = getState();

    let ref = firebase.child('forms2');

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

    firebase.child('forms2').push(form);
  }
}
