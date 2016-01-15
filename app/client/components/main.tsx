import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setFirebase } from '../actions/firebase';
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
      dispatch(setFirebase(ref));
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
    let { children } = this.props;

    return (
      <main>
        <AppHeader />
        <viewport>{children}</viewport>
      </main>
    );
  }
}
