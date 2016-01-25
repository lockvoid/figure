import { BaseRecord } from './base_record';

export interface WebhookAttrs {
  url: string,
  secret: string,
}

export class WebhookRecord extends BaseRecord {
  url: string;
  secret: string;
}
