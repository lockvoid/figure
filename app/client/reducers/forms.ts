import { Reducer } from 'redux';
import { List, Map } from 'immutable';

import { RESET_FORMS, FORM_ADDED, FORM_CHANGED, FORM_MOVED, FORM_REMOVED, REMOVE_FORM_AND_REDIRECT } from '../actions/forms';
import { SET_FIREBASE_REF } from '../actions/firebase';

export const forms: Reducer = (state = initialState(), action) => {
  switch (action.type) {
    case RESET_FORMS:
      return initialState();
   case FORM_ADDED:
      return childAdded(state, action.snapshot, action.prevChild);
    case FORM_CHANGED:
      return childChanged(state, action.snapshot);
    case FORM_MOVED:
      return childMoved(state, action.snapshot, action.prevChild);
    case FORM_REMOVED:
      return childRemoved(state, action.snapshot);
   default:
      return state;
  }
}

function initialState() {
  return List();
}

function childAdded(list: List<any>, snapshot: any, prevChild: string): any {
  let index = nextChildIndex(list, prevChild);
  let child = serializeChild(snapshot);

  return list.splice(index, 0, child);
}

function childChanged(list: List<any>, snapshot: FirebaseDataSnapshot) {
  let index = indexForChild(list, snapshot.key());

  if (index > -1) {
    return list.set(index, serializeChild(snapshot));
  } else {
    return list;
  }
}

function childMoved(list: List<any>, snapshot: FirebaseDataSnapshot, prevChild: string) {
  let currIndex = indexForChild(list, snapshot.key());

  if (currIndex > -1) {
    let child = list.get(currIndex);
    list = list.delete(currIndex);

    let newIndex = nextChildIndex(list, prevChild);
    list = list.splice(newIndex, 0, child).toList();

    return list;
  }

  return list;
}

function childRemoved(list: List<any>, snapshot: FirebaseDataSnapshot) {
  let index = indexForChild(list, snapshot.key());

  if (index > -1) {
    return list.delete(index)
  } else {
    return list;
  }
}

function nextChildIndex(list: List<any>, key: string): number {
  let index = indexForChild(list, key);

  if (index === -1) {
    return list.size;
  } else {
    return index + 1;
  }
}

function indexForChild(list: List<any>, key: string): number {
  return list.findIndex(child => child.$key === key);
}

function serializeChild(snapshot: any): any {
  let val = snapshot.val();
  val.$key = snapshot.key();

  return val;
}
