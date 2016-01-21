import * as React from 'react';
import { FieldProp } from 'redux-form';

export interface CheckboxFieldProps extends FieldProp, React.Props<CheckboxField> {
}

export class CheckboxField extends React.Component<CheckboxFieldProps, {}> {
  className(): string {
    let { value } = this.props;

    if (value) {
      return 'checked';
    } else {
      return '';
    }
  }

  render() {
    let { children } = this.props;
    let field: FieldProp = Object.assign({}, this.props, { children: null });

    return (
      <div className={`checkbox ${this.className()}`}>
        <input type="checkbox" {...field} />
        <i>/* @include /public/images/icons/check.svg */</i>
        <label>{children}</label>
      </div>
    );
  }
}
