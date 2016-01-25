import { Dispatch } from 'redux';
import { WebhookAttrs } from '../../../lib/models/webhook';

export const WEBHOOK_VALUE = 'WEBHOOK_VALUE';
export const RESET_WEBHOOK = 'RESET_WEBHOOK';

const callbacks = {};
let cFormId  = '';

export function bindWebhook(formId: string): Function {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();;

    let ref = firebase.child('webhooks').child(formId);
    cFormId = formId;

    setTimeout(() => {
      callbacks[WEBHOOK_VALUE] = ref.on('value', snapshot => {
        dispatch({ type: WEBHOOK_VALUE, snapshot });
      });
    });
  };
}

export function unbindWebhook(): Function {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    let ref = firebase.child('webhooks').child(cFormId);

    ref.off('value', callbacks[WEBHOOK_VALUE]);

    dispatch({ type: RESET_WEBHOOK })
  }
}

export function updateWebhook(formId: string, webhookAttrs: WebhookAttrs): Function {
  return (dispatch: Dispatch, getState) => {
    const { firebase } = getState();

    firebase.child('webhooks').child(formId).update(webhookAttrs);
  }
}

