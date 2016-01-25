import { Reducer } from 'redux';
import { WebhookRecord } from '../../../lib/models/webhook';
import { WEBHOOK_VALUE, RESET_WEBHOOK } from '../actions/webhooks';

export const webhook: Reducer = (state = null, action) => {
  switch (action.type) {
    case WEBHOOK_VALUE:
      return serializeWebhook(action.snapshot);
    case RESET_WEBHOOK:
      return null;
    default:
      return state;
  }
}

function serializeWebhook(snapshot): WebhookRecord {
  return new WebhookRecord(snapshot);
}

