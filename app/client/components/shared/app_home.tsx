import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { redirectToFirstForm } from '../../actions/forms';

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    tryRedirect: () => {
      dispatch(redirectToFirstForm());
    }
  }
}

@connect(null, dispatchToProps)
export class AppHome extends React.Component<any, any> {
  componentWillMount() {
    this.props.tryRedirect();
  }

  render() {
    return null;
  }
}
