import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { findForm } from '../../reducers/forms';
import * as React from 'react';

const stateToProps = (state, props) => {
  return { currentForm: findForm(state.forms, props.params.formId) };
}

@connect(stateToProps)
export class SetupForm extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>FormSetup</h1>
      </div>
    );
  }
}
