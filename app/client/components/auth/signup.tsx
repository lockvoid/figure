import * as React from 'react';

import { Link } from 'react-router';
import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { signup } from '../../actions/index';
import { Flash, Group, Validator, Label, Input, Error, MaterialButton } from '../ui/forms/index';
import { combineValidators, requiredValidator, emailValidator, passwordValidator, uniquenessValidator } from '../../utils/validators';
import { Api } from '../../lib/api';

import * as styles from './auth.css.json!';

const formConfig = {
  form: 'signup',

  fields: [
    'email', 'password', 'name'
  ],

  validate: combineValidators({
    email: [
      requiredValidator, emailValidator
    ],

    password: [
      requiredValidator, passwordValidator
    ],

    name: [
      requiredValidator
    ],
  }),

  asyncBlurFields: [
    'email'
  ],

  asyncValidate: uniquenessValidator('email', email => Api.isEmailUniqueness(email)),
}

const stateToProps: MapStateToProps = (state) => {
  return state.auth;
}

const dispatchToProps: MapDispatchToPropsFunction = (dispatch) => {
  return {
    onSubmit: ({ email, password, name }) => new Promise((resolve, reject) => {
      dispatch(signup(email, password, name, resolve, reject));
    }),
  }
}

@reduxForm(formConfig, stateToProps, dispatchToProps)
export class Signup extends React.Component<any, any> {
  render() {
    const { fields: { email, password, name }, asyncValidating, handleSubmit, submitting, error } = this.props;

    return (
      <main className={styles.main}>
        <a href="/" className={styles.logo}>/* @include /public/images/figure.svg */</a>

        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.inputs}>
            <Flash className={styles.flash} level="warning" visible={!submitting && !!error}>{error}</Flash>

            <Group>
              <Label field={email}>
                <span>Email</span>
                <Validator visible={asyncValidating === 'email'}>Checking</Validator>
              </Label>

              <Input field={email} type="email" />
              <Error field={email} />
            </Group>

            <Group>
              <Label field={password}>Password</Label>
              <Input field={password} type="password" />
              <Error field={password} />
            </Group>

            <Group>
              <Label field={name}>Name</Label>
              <Input field={name} type="text" />
              <Error field={name} />
            </Group>

            <section className={styles.buttons}>
              <MaterialButton submitting={submitting}>Sign Up</MaterialButton>
            </section>
          </section>

          <Link to="/signin" className={styles.footer}>
            Already have an account? Sign In
          </Link>
        </form>
      </main>
    );
  }
}
