import * as React from 'react';

import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { updateForm } from '../../../actions/index';
import { FieldBox, SubmitButton } from '../../ui/forms/index';

const formConfig = {
  form: 'form',

  fields: [
    'webhook_url'
  ],
}

const mapStateToProps: MapStateToProps = ({ auth: { api }, forms }, { currentForm }) => {
  return { api, initialValues: currentForm };
}

const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch, { form }) => ({
  onSubmit: (payload) => new Promise((resolve, reject) => {
    dispatch(updateForm(form.id, payload, resolve, reject))
  }),
});

@reduxForm(formConfig, mapStateToProps, mapDispatchToProps)
export class FormWebhooks extends React.Component<any, any> {
  render() {
    const { fields: { webhook_url }, handleSubmit, submitting, error } = this.props;

    return (
      <div className="forms webhooks">
        <wrapper>
          <form className="default" onSubmit={handleSubmit}>
            {error && !submitting && <div className="alert failure">{error}</div>}

            <FieldBox {...webhook_url}>
              <div className="title">Webhook Url</div>
              <input type="text" {...webhook_url} />
              <div className="hint">Send an HTTP POST to this URL on a new submission.</div>
            </FieldBox>

            <div className="buttons">
              <SubmitButton title="Update" submitting={submitting} />
            </div>
          </form>
        </wrapper>
      </div>
    );
  }
}
