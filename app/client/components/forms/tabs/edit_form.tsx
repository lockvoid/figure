import * as React from 'react';

import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../../utils/validators';
import { updateForm, deleteForm } from '../../../actions/index';
import { Flash, Group, Label, Hint, Input, Checkbox, Error, MaterialButton, FlatButton } from '../../ui/forms/index';

import * as styles from './edit_form.css.json!';

const formConfig = {
  form: 'form',

  fields: [
    'name', 'redirect_to', 'notify_me'
  ],

  validate: combineValidators({
    name: [
      requiredValidator
    ],
  }),
}

const mapStateToProps: MapStateToProps = ({ auth: { api } }, { current: { form } }) => {
  return { api, initialValues: form };
}

const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch, { current: { form } }) => ({
  onSubmit: (payload) => new Promise((resolve, reject) => {
    dispatch(updateForm(form.id, payload, resolve, reject))
  }),

  onDelete: () => {
    if (window.confirm("Do you really want to delete?")) {
      dispatch(deleteForm(form.id));
    }
  },
});

@reduxForm(formConfig, mapStateToProps, mapDispatchToProps)
export class EditForm extends React.Component<any, any> {
  render() {
    const { fields: { name, redirect_to, notify_me }, handleSubmit, onDelete, submitting, error } = this.props;

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <Flash className={styles.flash} level="warning" visible={!submitting && !!error}>{error}</Flash>

        <Group>
          <Label field={name}>Form Name</Label>
          <Input field={name} type="text" />
          <Error field={name} />
        </Group>

        <Group>
          <Label field={redirect_to}>Redirect Url</Label>
          <Input field={redirect_to} type="text" placeholder="https://figure-app.com/thankyou" />
          <Error field={redirect_to} />
        </Group>

        <Group>
          <Checkbox field={notify_me}>Notify Me?</Checkbox>
          <Hint>Send a notification to your email on a new submission.</Hint>
        </Group>

        <section className={styles.buttons}>
          <MaterialButton submitting={submitting}>Update</MaterialButton>
          <FlatButton type="button" theme="danger" onClick={onDelete}>Delete</FlatButton>
        </section>
      </form>
    );
  }
}
