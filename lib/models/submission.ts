import { BaseRecord } from './base_record';
import { List } from 'immutable';

export interface SubmissionAttrs {
}

export class SubmissionRecord extends BaseRecord {
  get fields(): List<{ $key: string, $value: string }> {
    var list = List<{$key: string, $value: string }>();

    this.$snapshot.child('fields').forEach(snapshot => {
      list = list.push(new BaseRecord(snapshot));
    });

    return list;
  }
}
