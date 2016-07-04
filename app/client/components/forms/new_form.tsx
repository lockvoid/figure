import * as React from 'react';

import { Dispatch } from 'redux';
import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../utils/validators';
import { createForm } from '../../actions/index';
import { Flash, Group, Label, Input, Hint, Error, MaterialButton } from '../ui/forms/index';

import * as styles from './new_form.css.json!';

const formConfig = {
  form: 'form',

  fields: [
    'name'
  ],

  validate: combineValidators({
    name: [
      requiredValidator
    ],
  }),
}

const mapStateToProps: MapStateToProps  = (state: any) => {
  return state;
}

const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch: Dispatch) => {
  return {
    onSubmit: (payload) => new Promise((resolve, reject) => {
      dispatch(createForm(payload, resolve, reject))
    }),
  }
}

@reduxForm(formConfig, mapStateToProps, mapDispatchToProps)

export class NewForm extends React.Component<any, any> {
  render() {
    const { fields: { name }, handleSubmit, submitting, error } = this.props;

    return (
      <section className={styles.container}>
        <h1 className={styles.header}>Create a new form</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Flash className={styles.flash} level="warning" visible={!submitting && !!error}>{error}</Flash>

          <Group>
            <Label field={name}>Form Name</Label>
            <Input field={name} type="text" />
            <Hint>Now just head with a name. Setup the form later.</Hint>
            <Error field={name} />
          </Group>

          <section className={styles.buttons}>
            <MaterialButton submitting={submitting}>Continue</MaterialButton>
          </section>
        </form>
      </section>
    );
  }
}
