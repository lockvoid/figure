import * as Firebase from 'firebase';

export const SET_FIREBASE_REF = 'SET_FIREBASE_REF';
export const CHILD_ADDED = 'CHILD_ADDED';
export const CHILD_CHANGED = 'CHILD_CHANGED';
export const CHILD_MOVED = 'CHILD_MOVED';
export const CHILD_REMOVED = 'CHILD_REMOVED';
export const VALUE = 'VALUE';

export function setFirebase(ref: Firebase): any {
  return { type: SET_FIREBASE_REF, value: ref };
}

export function bindAsObject(query: (ref: Firebase) => FirebaseQuery) {
}

export function bindAsArray(query: (ref: Firebase) => FirebaseQuery) {
  return (dispatch: any, { firebase }: { firebase: Firebase })  => {
    let ref = query(firebase);

    ref.on(CHILD_ADDED.toLowerCase(), (snapshot, prevChild) => {
      dispatch({ type: CHILD_ADDED, snapshot, prevChild });
    });

    ref.on(CHILD_CHANGED.toLowerCase(), (snapshot) => {
      dispatch({ type: CHILD_CHANGED, snapshot });
    });

    ref.on(CHILD_MOVED.toLowerCase(), (snapshot, prevChild) => {
      dispatch({ type: CHILD_MOVED, snapshot, prevChild });
    });

    ref.on(CHILD_REMOVED.toLowerCase(), (snapshot) => {
      dispatch({ type: CHILD_REMOVED, snapshot });
    });
  };
}


