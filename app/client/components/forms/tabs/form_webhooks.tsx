import * as React from 'react';

import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { updateForm } from '../../../actions/index';
import { Flash, Group, Label, Hint, Input, Error, Submit } from '../../ui/forms/index';

import * as styles from './form_webhooks.css.json!';

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
      <form className={styles.form} onSubmit={handleSubmit}>
        <Flash className={styles.flash} level="warning" visible={!submitting && !!error}>{error}</Flash>

        <Group>
          <Label field={webhook_url}>Webhook Url</Label>
          <Input field={webhook_url} type="text" />
          <Hint>Send a POST request to the URL above on a new submission.</Hint>
          <Error field={webhook_url} />
        </Group>

        <section className={styles.buttons}>
          <Submit submitting={submitting}>Update</Submit>
        </section>
      </form>
    );
  }
}
