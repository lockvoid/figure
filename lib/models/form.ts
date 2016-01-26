import { BaseRecord } from './base_record';

export interface FormAttrs {
  name: string;
  redirectUrl: string;
  notifyMe: boolean;
}

export class FormRecord extends BaseRecord {
  name: string;
  redirectUrl: string;
  notifyMe: boolean;
}
