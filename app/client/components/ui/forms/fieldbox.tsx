import * as React from 'react';

import { FieldProp } from 'redux-form';
import { FieldError } from './field_error';

export class FieldBox extends React.Component<FieldProp & React.Props<FieldBox>, {}> {
  className(): string {
    const { active, error, touched } = this.props;

    if (error && touched) {
      return 'field invalid';
    }

    if (active) {
      return 'field focused'
    }

    return 'field';
  }

  render() {
    const { children } = this.props;

    return (
      <label className={this.className()}>
        {children}
        <FieldError {...this.props} />
      </label>
    );
  }
}
