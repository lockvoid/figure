import { BaseRecord } from './base_record';

export interface WebhookAttrs {
  url: string,
  secure: string,
}

export class WebhookRecord extends BaseRecord {
}
