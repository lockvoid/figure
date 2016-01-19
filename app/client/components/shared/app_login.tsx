import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Link } from 'react-router';

import { loginWithGithub } from '../../actions/auth';

const stateToProps = (state) => {
  return { error: state.auth.status.error };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    onGithubLogin: () => {
      dispatch(loginWithGithub());
    }
  }
}

@connect(stateToProps, dispatchToProps)
export class AppLogin extends React.Component<any, any> {
  render() {
    let { onGithubLogin, error } = this.props;

    return (
      <div>
        <h1>Login</h1>

        <div>
          <button onClick={onGithubLogin}>Login with GitHub</button>
        </div>

         {error && <div className="error">{error.toString()}</div>}
      </div>
    );
  }
}
