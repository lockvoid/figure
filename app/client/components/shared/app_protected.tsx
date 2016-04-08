import * as React from 'react';

import { connect, MapStateToProps, MapDispatchToPropsObject } from 'react-redux';
import { Dispatch } from 'redux';
import { AppHeader } from './app_header';
import { AppSpinner } from '../../../../lib/components/app_spinner';
import { watchForms, unwatchForms } from '../../actions/index';

const stateToProps: MapStateToProps = (state) => {
  return state;
}

const dispatchToProps: MapDispatchToPropsObject = {
  watchForms, unwatchForms
}

@connect(stateToProps, dispatchToProps)
export class AppProtected extends React.Component<any, any> {
  componentWillMount() {
    this.props.watchForms();
  }

  componentWillUnmount() {
    this.props.unwatchForms();
  }

  render() {
    let { children, forms } = this.props;

    if (!forms.meta.initialized) {
      return <AppSpinner />;
    }

    return (
      <div className="protected">
        <AppHeader forms={forms} />
        <main>{children}</main>
      </div>
    );
  }
}
