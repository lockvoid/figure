import * as React from 'react';

import { connect, MapStateToProps, MapDispatchToPropsObject } from 'react-redux';
import { streamForms, unsubscribeForms } from '../actions/index';
import { Wrapper } from '../components/ui/wrapper';
import { RootHeader } from '../components/ui/root_header';
import { Spinner } from '../../../lib/components/spinner';

const mapStateToProps: MapStateToProps = ({ forms }) => {
  return { forms };
}

const mapDispatchToProps: MapDispatchToPropsObject = {
  streamForms, unsubscribeForms
}

@connect(mapStateToProps, mapDispatchToProps)
export class Protected extends React.Component<any, any> {
  componentWillMount() {
    const { streamForms } = this.props;

    streamForms();
  }

  componentWillUnmount() {
    const { unsubscribeForms } = this.props;

    unsubscribeForms();
  }

  render() {
    const { children, forms } = this.props;

    if (!forms.meta.initialized) {
      return <Spinner />;
    }

    return (
      <Wrapper direction="row">
        <RootHeader forms={forms} />
        <main>{children}</main>
      </Wrapper>
    );
  }
}
