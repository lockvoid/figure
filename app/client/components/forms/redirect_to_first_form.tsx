import * as React from 'react';

import { connect, MapDispatchToPropsObject  } from 'react-redux';
import { Dispatch } from 'redux';
import { redirectToFirstForm } from '../../actions/index';

const dispatchToProps: MapDispatchToPropsObject = {
  redirectToFirstForm
}

@connect(null, dispatchToProps)
export class RedirectToFirstForm extends React.Component<any, any> {
  componentWillMount() {
    this.props.redirectToFirstForm();
  }

  render() {
    return null;
  }
}
