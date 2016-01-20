import * as React from 'react';
import { FieldProp } from 'redux-form';

export interface FieldErrorProps extends FieldProp, React.Props<FieldError> {
}

export class FieldError extends React.Component<FieldErrorProps, {}> {
  render() {
    let { error, touched } = this.props;

    return <div className="error">{error && touched ? error : null}</div>
  }
}

export interface FieldBoxProps extends FieldProp, React.Props<FieldBox> {
}

export class FieldBox extends React.Component<FieldBoxProps, {}> {
  className(): string {
    let { error, touched } = this.props;

    if (error && touched) {
      return 'field invalid';
    } else {
      return 'field'
    }
  }

  render() {
    let { children } = this.props;

    return (
      <label className={this.className()}>
        {children}
        <FieldError {...this.props} />
      </label>
    );
  }
}


