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
