import { Reducer } from 'redux';
import { List, Record } from 'immutable';
import { Theron, ROW_ADDED, ROW_REMOVED, ROW_MOVED, ROW_CHANGED, BEGIN_TRANSACTION, COMMIT_TRANSACTION } from 'theron';

export interface SyncronizedArrayMetaProps {
  initialized: boolean;
  transaction: boolean;
}

export const SyncronizedArrayMeta = Record<SyncronizedArrayMetaProps>({
  initialized: false,
  transaction: false,
});

export function syncronizeArray<T>(query: string, resetAction: string) {
  const rows = (state = List<T>(), action): List<T> => {
    if (action.query !== query && action.type !== resetAction) {
      return state;
    }

    switch (action.type) {
      case BEGIN_TRANSACTION:
        return action.initial ? state.clear() : state;

      case ROW_ADDED:
        return rowAdded(state, action.payload);

      case ROW_CHANGED:
        return rowChanged(state, action.payload);

      case ROW_MOVED:
        return rowMoved(state, action.payload);

      case ROW_REMOVED:
        return rowRemoved(state, action.payload);

      case resetAction:
        return state.clear();

      default:
        return state;
    }
  }

  const meta = (state = new SyncronizedArrayMeta(), action) => {
    if (action.query !== query && action.type !== resetAction) {
      return state;
    }

    switch (action.type) {
      case BEGIN_TRANSACTION:
        return state.merge({ transaction: true });

      case COMMIT_TRANSACTION:
        return state.merge({ initialized: true, transaction: false });

      case resetAction:
        return new SyncronizedArrayMeta();

      default:
        return state;
    }
  }

  return { rows, meta };
}

function rowAdded<T>(rows: List<T>, { row, prevRowId }): List<T> {
  const index = nextRowIndex(rows, prevRowId);

  return rows.splice(index, 0, row).toList();
}

function rowChanged(rows: List<any>, { row }) {
  const index = indexForRow(rows, row.id);

  if (index > -1) {
    return rows.set(index, row);
  } else {
    return rows;
  }
}

function rowMoved(rows: List<any>, { row, prevRowId }) {
  const currIndex = indexForRow(rows, row.id);

  if (currIndex > -1) {
    const row = rows.get(currIndex);
    rows = rows.delete(currIndex);

    const newIndex = nextRowIndex(rows, prevRowId);
    rows = rows.splice(newIndex, 0, row).toList();

    return rows;
  }

  return rows;
}

function rowRemoved(rows: List<any>, { row }) {
  let index = indexForRow(rows, row.id);

  if (index > -1) {
    return rows.delete(index)
  } else {
    return rows;
  }
}

function indexForRow(rows: List<any>, rowId: number): number {
  return rows.findIndex(row => row.id === rowId);
}

function nextRowIndex<T>(rows: List<T>, prevRowId: number): number {
  if (prevRowId === null) {
    return 0;
  }

  let index = indexForRow(rows, prevRowId);

  if (index === -1) {
    return rows.size;
  } else {
    return index + 1;
  }
}

export function nextRowId(rows: List<any>, prevRowId: number) {
  const index = nextRowIndex(rows, prevRowId);

  if (index) {
    rows[index].id;
  } else {
    return null;
  }
}
