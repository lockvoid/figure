import * as React from 'react';

import { routeActions } from 'react-router-redux';
import { connect, MapStateToProps, MapDispatchToPropsObject  } from 'react-redux';

const mapDispatchToProps: MapDispatchToPropsObject = {
  performRedirect: routeActions.replace
}

@connect(null, mapDispatchToProps)
export class FormTabsIndexRedirect extends React.Component<any, any> {
  componentWillMount() {
    const { current: { form }, performRedirect } = this.props;

    if (form.submissions_count > 0) {
      performRedirect(`/forms/${form.id}/submissions`);
    } else {
      performRedirect(`/forms/${form.id}/setup`);
    }
  }

  render() {
    return null;
  }
}
