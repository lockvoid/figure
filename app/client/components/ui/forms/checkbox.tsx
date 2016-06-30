import * as React from 'react';

import { FieldProp } from 'redux-form';

export class CheckBox extends React.Component<FieldProp & React.Props<CheckBox>, {}> {
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
        <input type="hidden" {...field} value="false" />
        <input type="checkbox" {...field} />
        <i>/* @include /public/images/icons/check.svg */</i>
        <div className="title">{children}</div>
      </div>
    );
  }
}
