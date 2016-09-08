import * as React from 'react';

import { connect, MapDispatchToPropsObject } from 'react-redux';
import { redirectToFirstForm } from '../../../actions/index';

const mapDispatchToProps: MapDispatchToPropsObject = {
  redirectToFirstForm
}

@connect(null, mapDispatchToProps)
export class FormsIndexRedirect extends React.Component<any, any> {
  componentWillMount() {
    this.props.redirectToFirstForm();
  }

  render() {
    return null;
  }
}
