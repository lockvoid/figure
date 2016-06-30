import * as React from 'react';

import { connect, MapDispatchToPropsObject } from 'react-redux';

import { logout } from '../../actions/index';

const mapDispatchToProps: MapDispatchToPropsObject = {
  logout
}

@connect(null, mapDispatchToProps)
export class Logout extends React.Component<any, any> {
  componentDidMount() {
    const { logout } = this.props;

    logout();
  }

  render() {
    return null;
  }
}
