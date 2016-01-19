import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppHeader } from './app_header';
import { AppSpinner } from '../../../../lib/components/app_spinner';
import * as React from 'react';
import { bindForms, unbindForms } from '../../actions/forms';

const stateToProps = (state) => {
  return { forms: state.forms, auth: state.auth };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    mountForms: () => {
      dispatch(bindForms());
    },

    unmountForms: () => {
      dispatch(unbindForms());
    },
  }
}

@connect(stateToProps, dispatchToProps)
export class AppProtected extends React.Component<any, any> {
  componentWillMount() {
    let { mountForms } = this.props;
    mountForms();
  }

  componentWillUnmount() {
    let { unmountForms } = this.props;
    unmountForms();
  }

  render() {
    let { auth, forms, children } = this.props;

    if (!auth.user || !forms.ready ) {
      return <AppSpinner />;
    }

    return (
      <main>
        <AppHeader forms={forms} />
        <wrap>{children}</wrap>
      </main>
    );
  }
}

