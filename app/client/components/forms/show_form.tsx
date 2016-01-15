import * as React from 'react';
import { connect } from 'react-redux';

@connect()
export class ShowForm extends React.Component<any, any> {
  render() {
    const { params } = this.props;

    return (
      <div>{ params.formId }</div>
    );
  }
}
