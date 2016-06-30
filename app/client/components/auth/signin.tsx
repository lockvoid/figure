import * as React from 'react';

import { Link } from 'react-router';
import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { signin } from '../../actions/index';
import { FieldBox, SubmitButton } from '../ui/forms/index';
import { combineValidators, requiredValidator, emailValidator, passwordValidator } from '../../utils/validators';

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
      <main>
        <a href="/" className="logo">/* @include /public/images/figure.svg */</a>

        <form className="default" onSubmit={handleSubmit}>
          <wrapper>
            {error && !submitting && <div className="alert warning">{error}</div>}

            <FieldBox {...email}>
              <div className="title">Email</div>
              <input type="text" {...email} />
            </FieldBox>

            <FieldBox {...password}>
              <div className="title">Password</div>
              <input type="password" {...password} />
            </FieldBox>

            <div className="buttons">
              <SubmitButton title="Sign In" submitting={submitting} className="justify" />
            </div>
          </wrapper>

          <Link to="/signup" className="footer">
            New to Figure? Sign Up
          </Link>
        </form>
      </main>
    );
  }
}
