import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { removeFormAndRedirect } from '../../actions/forms';

const mapStateToProps = (state: any) => {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class NewForm extends React.Component<any, any> {
  render() {
    return (
      <div>
        NewFormComponent
      </div>
    );
  }
}
