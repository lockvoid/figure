import * as React from 'react';

import { routeActions } from 'react-router-redux';
import { connect, MapStateToProps, MapDispatchToPropsObject  } from 'react-redux';

const mapStateToProps: MapStateToProps = ({ forms }, { params }) => ({
  form: forms.rows.find(form => form.id === params.formId)
});

const mapDispatchToProps: MapDispatchToPropsObject = {
  performRedirect: routeActions.replace
}

@connect(mapStateToProps, mapDispatchToProps)
export class RedirectToSubmissions extends React.Component<any, any> {
  componentWillMount() {
    const { form, performRedirect } = this.props;

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
