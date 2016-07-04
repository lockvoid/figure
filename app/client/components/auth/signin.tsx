import * as React from 'react';

import { Link } from 'react-router';
import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { signin } from '../../actions/index';
import { Flash, Group, Label, Input, Error, Submit } from '../ui/forms/index';
import { combineValidators, requiredValidator, emailValidator, passwordValidator } from '../../utils/validators';

import * as styles from './auth.css.json!';

const formConfig = {
  form: 'signin',

  fields: [
    'email', 'password'
  ],

  validate: combineValidators({
    email: [
      requiredValidator, emailValidator
    ],

    password: [
      requiredValidator, passwordValidator
    ],
  }),
}

const mapStateToProps: MapStateToProps = (state) => {
  return state.auth;
}

const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch) => {
  return {
    onSubmit: ({ email, password }) => new Promise((resolve, reject) => {
      dispatch(signin(email, password, resolve, reject));
    }),
  }
}

@reduxForm(formConfig, mapStateToProps, mapDispatchToProps)
export class Signin extends React.Component<any, any> {
  render() {
    const { fields: { email, password }, handleSubmit, submitting, error } = this.props;

    return (
      <main className={styles.main}>
        <a href="/" className={styles.logo}>/* @include /public/images/figure.svg */</a>

        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.inputs}>
            <Flash className={styles.flash} level="warning" visible={!submitting && !!error}>{error}</Flash>

            <Group>
              <Label field={email}>Email</Label>
              <Input field={email} type="email" />
              <Error field={email} />
            </Group>

            <Group>
              <Label field={password}>Password</Label>
              <Input field={password} type="password" />
              <Error field={password} />
            </Group>

            <section className={styles.buttons}>
              <Submit className={styles.submit} submitting={submitting}>Sign In</Submit>
            </section>
          </section>

          <Link to="/signup" className={styles.footer}>
            New to Figure? Sign Up
          </Link>
        </form>
      </main>
    );
  }
}
