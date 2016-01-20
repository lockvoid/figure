import { List, Map } from 'immutable';
import { Reducer, combineReducers } from 'redux';

import { SET_FIREBASE_REF } from '../actions/firebase';

export type Comparator<T> = (lhs: T, rhs: T) => number;

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
        return childAdded(state, action.snapshot, action.comparator, serializer, action.reverse);
      case childChangedType:
        return childChanged(state, action.snapshot, serializer);
      case childMovedType:
        return childMoved(state, action.snapshot, action.comparator, action.reverse);
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

const initialState = (): List<any> => {
  return List();
}

const isComparator = (object: any): object is Comparator<any> => {
  return typeof object === "function";
}

const childAdded = (list: List<any>, snapshot: any, comparator: string | Comparator<any>, serializeChild: Function, reverse: boolean): List<any> => {
  let child = serializeChild(snapshot);
  var index;

  if (isComparator(comparator)) {
    index = insertionIndexOf(list, child, comparator);
  } else {
    index = nextChildIndex(list, comparator, reverse);
  }

  return list.splice(index, 0, child).toList();
}

const childChanged = (list: List<any>, snapshot: FirebaseDataSnapshot, serializeChild: Function): List<any> => {
  let index = indexForChild(list, snapshot.key());

  if (index > -1) {
    return list.set(index, serializeChild(snapshot));
  } else {
    return list;
  }
}

const childMoved = (list: List<any>, snapshot: FirebaseDataSnapshot, comparator: Comparator<any> | string, reverse: boolean): List<any> => {
  let currIndex = indexForChild(list, snapshot.key());

  if (currIndex > -1) {
    let currChild = list.get(currIndex);
    list = list.delete(currIndex);

    var newIndex: number;

    if (isComparator(comparator)) {
      newIndex = insertionIndexOf(list, currChild, comparator);
    } else {
      newIndex = nextChildIndex(list, comparator, reverse);
    }

    return list.splice(newIndex, 0, currChild).toList();
  }

  return list;
}

const childRemoved = (list: List<any>, snapshot: FirebaseDataSnapshot): List<any> => {
  let index = indexForChild(list, snapshot.key());

  if (index > -1) {
    return list.delete(index)
  } else {
    return list;
  }
}

const nextChildIndex = (list: List<any>, key: string, reverse: boolean = false): number => {
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

const indexForChild = (list: List<any>, key: string): number => {
  return list.findIndex(child => child.$key === key);
}

const indexOf = <T>(list: List<T>, child: T, comparator: Comparator<T>): number => {
  var minIndex = 0;
  var maxIndex = list.size - 1;
  var currentIndex;
  var currentChild;

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0;
    currentChild = list.get(currentIndex);

    let compareResult = comparator(child, currentChild);

    if (compareResult > 0) {
      minIndex = currentIndex + 1;
    } else if (compareResult < 0) {
      maxIndex = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }

  return -(minIndex + 1);
}

const insertionIndexOf = <T>(list: List<T>, child: T, comparator: Comparator<T>): number => {
  let childIndex = indexOf(list, child, comparator);

  if (childIndex < 0) {
    return Math.abs(childIndex + 1);
  } else {
    return childIndex;
  }
}
