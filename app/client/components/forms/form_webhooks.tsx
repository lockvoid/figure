import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FieldBox } from '../shared/field_box';
import { updateWebhook, bindWebhook, unbindWebhook } from '../../actions/webhooks';
import { combineValidators, secureUrlValidator } from '../../utils/validators';
import { AppSpinner } from '../../../../lib/components/app_spinner';
import { WebhookAttrs } from '../../../../lib/models/webhook.ts';
import { generateSecret } from '../../utils/secure';
import * as React from 'react';

const formConfig = {
  form: 'webhook',
  fields: ['url', 'secret'],

  validate: combineValidators({
    url: [secureUrlValidator],
  }),

  initialValues: {
    url: '',
    secret: '',
  },
}

const stateToProps = (state, props) => {
  let initialValues = Object.assign({}, { url: '', secret: '' }, state.webhook || {});

  return { webhook: state.webhook, initialValues };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    mountWebhook: (formId: string) => {
      dispatch(bindWebhook(formId));
    },

    unmountWebhook: () => {
      dispatch(unbindWebhook());
    },

    onUpdate: (formId: string, webhookAttrs: WebhookAttrs) => {
      dispatch(updateWebhook(formId, webhookAttrs));
    },
  }
}

@reduxForm(formConfig, stateToProps, dispatchToProps)
export class FormWebhooks extends React.Component<any, any> {
  context: any;

  static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    let { mountWebhook, params: { formId } } = this.props;
    mountWebhook(formId);
  }

  componentWillUnmount() {
    let { unmountWebhook } = this.props;
    unmountWebhook();
  }

  componentDidMount() {
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(route) {
    if (this.props.dirty && !window.confirm("You have unsaved changed. Do you really want to leave?")) {
      return false;
    }
  }

  render() {
    const { webhook, fields: { url, secret }, params: { formId }, onUpdate, handleSubmit } = this.props;

    if (webhook === null) {
      return <AppSpinner />
    }

    return (
      <div className="form webhooks">
        <h1>Webhooks Center</h1>

        <form className="classic" onSubmit={handleSubmit((attrs: WebhookAttrs) => onUpdate(formId, attrs))}>
          <FieldBox {...url}>
            <label>Payload Url</label>
            <input type="text" placeholder="https://example.com/hook" {...url} />
            <div className="hint">Send a POST request to a secure url on a new form submission.</div>
          </FieldBox>

          <FieldBox {...secret}>
            <label>Secret Key</label>

            <div className="generator">
              <input type="text" {...secret} />
              <button type="button" className="reset generate" title="Generate random key" onClick={this.resetKey.bind(this)}>Reset Key</button>
            </div>

            <div className="hint">Append a X-Figure-Signature header with a HMAC hex digest of the payload if configured.</div>
          </FieldBox>

          <div className="buttons">
            <button type="submit">Save</button>
          </div>
       </form>
      </div>
    );
  }

  private resetKey() {
    const { fields: { secret } } = this.props;

    if (secret.value && !secret.dirty) {
      if (window.confirm("Do you really want to reset the secret key?")) {
        secret.onChange(generateSecret(16));
      }
    } else {
      secret.onChange(generateSecret(16));
    }
  }
}
