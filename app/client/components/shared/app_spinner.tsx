import * as React from 'react';

export interface AppSpinnerProps {
  hidden?: boolean | number;
}

export class AppSpinner extends React.Component<AppSpinnerProps, {}> {
  render() {
    if (this.props.hidden) {
      return null;
    } else {
      return (
        <spinner>
          <div />
          <div />
          <div />
        </spinner>
      );
    }
  }
}
