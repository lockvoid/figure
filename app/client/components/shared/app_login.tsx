import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import * as Firebase from 'firebase';
import { Link } from 'react-router';

import { loginWithGithub } from '../../actions/auth';

const mapStateToProps = (state: any) => {
  return { authError: state.auth.authError };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onGithubLogin: () => {
      dispatch(loginWithGithub());
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class AppLogin extends React.Component<any, any> {
  render() {
    let { onGithubLogin, authError  } = this.props;

    return (
      <div>
        <h1>Login</h1>

        <div>
          <button onClick={onGithubLogin}>Login with GitHub</button>
        </div>

         {authError && <div className="error">{authError.toString()}</div>}
      </div>
    );
  }
}
