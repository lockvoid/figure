import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

const stateToProps = (state, props) => {
  return { currentForm: state.forms.find(form => form.$key === props.params.formId) };
}

@connect(stateToProps)
export class FormSetup extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>FormSetup</h1>
      </div>
    );
  }
}
