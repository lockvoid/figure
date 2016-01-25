import { BaseRecord } from './base_record';
import { List } from 'immutable';

export interface SubmissionAttrs {
}

export class FieldRecord extends BaseRecord {
}

export class SubmissionRecord extends BaseRecord {
  createdAt: number;

  get fields(): List<FieldRecord> {
    var list = List<FieldRecord>();

    this.$snapshot.child('fields').forEach(snapshot => {
      list = list.push(new FieldRecord(snapshot));
    });

    return list;
  }
}
