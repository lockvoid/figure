import * as React from 'react';

import { connect, MapStateToProps, MapDispatchToPropsObject } from 'react-redux';
import { AppHeader } from './app_header';
import { AppSpinner } from '../../../../lib/components/app_spinner';
import { streamForms, unsubscribeForms } from '../../actions/index';

const mapStateToProps: MapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps: MapDispatchToPropsObject = {
  streamForms, unsubscribeForms
}

@connect(mapStateToProps, mapDispatchToProps)
export class AppProtected extends React.Component<any, any> {
  componentWillMount() {
    const { streamForms } = this.props;

    streamForms();
  }

  componentWillUnmount() {
    const { unsubscribe } = this.props;

    unsubscribeForms();
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
