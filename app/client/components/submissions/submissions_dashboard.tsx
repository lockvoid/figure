import * as React from 'react';

import { connect, MapStateToProps, MapDispatchToPropsObject } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { AppSpinner } from '../../../../lib/components/app_spinner';
import { SubmissionsAside } from './submissions_aside';
import { streamSubmissions, unsubscribeSubmissions } from '../../actions/index';

const mapStateToProps: MapStateToProps = ({ forms, submissions }, { params }) => {
  return { submissions, form: forms.rows.find(form => form.id === params.formId) };
}

const mapDispatchToProps: MapDispatchToPropsObject = {
  streamSubmissions, unsubscribeSubmissions, performRedirect: routeActions.replace
}

@connect(mapStateToProps, mapDispatchToProps)
export class SubmissionsDashboard extends React.Component<any, any> {
  componentWillMount() {
    const { form, streamSubmissions } = this.props;

    streamSubmissions(form.id);
  }

  componentWillUnmount() {
    const { unsubscribeSubmissions } = this.props;

    unsubscribeSubmissions();
  }

  componentWillReceiveProps(nextProps) {
    const { streamSubmissions, unsubscribeSubmissions, params } = this.props;

    if (params.formId !== nextProps.params.formId) {
      unsubscribeSubmissions();
      streamSubmissions(nextProps.params.formId);
    } else {
      this._redirectToFirstSubmission(nextProps);
    }
  }

  render() {
    let { form, submissions, children } = this.props;

    if (!submissions.meta.initialized) {
      return <AppSpinner />;
    }

    if (submissions.rows.size === 0) {
      return (
        <div className="submissions empty">
          <h4>WAITING FOR SUBMISSIONS</h4>
        </div>
      );
    }

    return (
      <div className="submissions dashboard">
        <SubmissionsAside form={form} submissions={submissions} />
        { children }
      </div>
    );
  }

  protected _redirectToFirstSubmission(props) {
    const { submissions, performRedirect, params } = props;

    if (!params.submissionId && submissions.rows.size > 0) {
      performRedirect(`forms/${params.formId}/submissions/${submissions.rows.first().id}`);
    }
  }
}
