import * as Firebase from 'firebase';

export const SET_FIREBASE_REF = 'SET_FIREBASE_REF';

export function setFirebase(ref: Firebase): any {
  return { type: SET_FIREBASE_REF, value: ref };
}
