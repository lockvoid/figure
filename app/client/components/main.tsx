import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppHeader } from './shared';
import * as React from 'react';
import { bindForms, unbindForms } from '../actions/forms';

export class Main extends React.Component<any, any> {
  render() {
    return this.props.children;
  }
}

const stateToProps = (state: any) => {
  return { forms: state.forms };
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
export class Dashboard extends React.Component<any, any> {
  componentWillMount() {
    let { mountForms } = this.props;
    mountForms();
  }

  componentWillUnmount() {
    let { unmountForms } = this.props;
    unmountForms();
  }

  render() {
    let { forms, children } = this.props;

    return (
      <main>
        <AppHeader forms={forms} />
        <wrap>{children}</wrap>
      </main>
    );
  }
}
