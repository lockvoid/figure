import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setFirebase } from '../actions/firebase';
import { bindAuth } from '../actions/auth_actions';
import { AppHeader } from './shared';
import * as React from 'react';
import * as Firebase from 'firebase';
import { Link } from 'react-router';

const mapStateToProps = (state: any) => {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onInit: (ref: Firebase) => {
    },
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Main extends React.Component<any, any> {
  constructor({ onInit }) {
    super();
    onInit(new Firebase('https://figure-dev.firebaseio.com'));
  }

  render() {
    return this.props.children;
  }
}

export class Dashboard extends React.Component<any, any> {
  render() {
    let { children } = this.props;

    return (
      <main>
        <AppHeader />
        <viewport>{children}</viewport>
      </main>
    );
  }
}
