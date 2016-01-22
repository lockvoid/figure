import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Link } from 'react-router';

import { loginWithGithub, loginWithFacebook } from '../../actions/auth';

const stateToProps = (state) => {
  return { error: state.auth.status.error };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    onFacebookLogin: () => {
      dispatch(loginWithFacebook());
    },

    onGithubLogin: () => {
      dispatch(loginWithGithub());
    },
  }
}

@connect(stateToProps, dispatchToProps)
export class AppLogin extends React.Component<any, any> {
  render() {
    let { onGithubLogin, onFacebookLogin, error } = this.props;

    return (
      <div className="login">
        <wrap>
          <Link to="/" className="logo">/* @include /public/images/figure.svg */</Link>
          <div className="providers">
            <button className="facebook" onClick={onFacebookLogin}>Login with Facebook</button>
            <button className="github" onClick={onGithubLogin}>Login with GitHub</button>
          </div>

          {error && <div className="error">{error.toString()}</div>}
        </wrap>
      </div>
    );
  }
}
