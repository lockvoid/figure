import { Reducer } from 'redux';
import { List } from 'immutable';

import { CHILD_ADDED, CHILD_CHANGED, CHILD_MOVED, CHILD_REMOVED } from '../actions/forms';
import { SET_FIREBASE_REF } from '../actions/firebase';

export const forms: Reducer = (state = List(), action) => {
  switch (action.type) {
    case CHILD_ADDED:
      return childAdded(state, action.snapshot, action.prevChild);
    case CHILD_CHANGED:
      return childChanged(state, action.snapshot);
    case CHILD_MOVED:
      return childMoved(state, action.snapshot, action.prevChild);
    case CHILD_REMOVED:
      return childRemoved(state, action.snapshot);
    default:
      return state;
  }
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
  // let currIndex = indexForChild(list, snapshot.key());

  // if (currIndex > -1) {
  //   let child = list.at(currIndex);

  //
  //   this._list.splice(currIndex, 1)[0];
  //   let newIndex = this._nextChildIndex(prevChild);

  //   this._list.splice(newIndex, 0, child);
  // } else {
  //   return list;
  // }
}

function childRemoved(list: List<any>, snapshot: FirebaseDataSnapshot) {
  let index = this._indexForChild(snapshot.key());

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


