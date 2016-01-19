import { List, Map } from 'immutable';
import { Reducer, combineReducers } from 'redux';

import { SET_FIREBASE_REF } from '../actions/firebase';

export const firebase: Reducer = (state = null, action) => {
  switch (action.type) {
    case SET_FIREBASE_REF:
      return action.value;
    default:
      return state;
  }
}

export const firebaseArray = (types, serializer) => {
  let [resetChildrenType, childrenReadyType, childAddedType, childChangedType, childMovedType, childRemovedType] = types;

  let value = (state = initialState(), action) => {
    switch (action.type) {
      case resetChildrenType:
        return initialState();
      case childAddedType:
        return childAdded(state, action.snapshot, action.prevChild, serializer, action.reverse);
      case childChangedType:
        return childChanged(state, action.snapshot, serializer);
      case childMovedType:
        return childMoved(state, action.snapshot, action.prevChild, action.reverse);
      case childRemovedType:
        return childRemoved(state, action.snapshot);
    default:
        return state;
    }
  }

  let ready = (state = false, action) => {
    switch (action.type) {
      case resetChildrenType:
        return false;
      case childrenReadyType:
        return true;
      default:
        return state;
    }
  }

  return combineReducers({ value, ready });
}

function initialState() {
  return List();
}

function childAdded(list: List<any>, snapshot: any, prevChild: string, serializeChild: Function, reverse: boolean): any {
  let index = nextChildIndex(list, prevChild, reverse);
  let child = serializeChild(snapshot);

  return list.splice(index, 0, child);
}

function childChanged(list: List<any>, snapshot: FirebaseDataSnapshot, serializeChild: Function) {
  let index = indexForChild(list, snapshot.key());

  if (index > -1) {
    return list.set(index, serializeChild(snapshot));
  } else {
    return list;
  }
}

function childMoved(list: List<any>, snapshot: FirebaseDataSnapshot, prevChild: string, reverse: boolean) {
  let currIndex = indexForChild(list, snapshot.key());

  if (currIndex > -1) {
    let child = list.get(currIndex);
    list = list.delete(currIndex);

    let newIndex = nextChildIndex(list, prevChild, reverse);
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

function nextChildIndex(list: List<any>, key: string, reverse: boolean = false): number {
  let index = indexForChild(list, key);

  if (reverse) {
    if (key === null) {
      return list.size;
    }

    if (index === -1) {
      return index + 1;
    } else {
      return 0;
    }
  } else {
    if (key === null ) {
      return 0;
    }

    let index = indexForChild(list, key);

    if (index === -1) {
      return list.size;
    } else {
      return index + 1;
    }
  }
}

function indexForChild(list: List<any>, key: string): number {
  return list.findIndex(child => child.$key === key);
}
