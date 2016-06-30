import * as React from 'react';

import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { Spinner } from '../../../lib/components/spinner';
import { SubmissionsAside } from '../components/submissions/submissions_aside';
import { streamSubmissions, unsubscribeSubmissions, deleteSubmission } from '../actions/index';

const mapStateToProps: MapStateToProps = ({ forms, submissions }, { params, current: { form } }) => {
  if (params.submissionId && submissions.meta.initialized) {
    var submission = submissions.rows.find(submission => submission.id === params.submissionId);
  } else {
    var submission = null;
  }

  return { form, submissions, submission };
}

const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch, { params }) => ({
  streamSubmissions: () => {
    dispatch(streamSubmissions(params.formId));
  },

  unsubscribeSubmissions: () => {
    dispatch(unsubscribeSubmissions());
  },

  performRedirect: (path) => {
    dispatch(routeActions.replace(path));
  },

  deleteSubmission: (id) => {
    if (window.confirm("Do you really want to delete?")) {
      dispatch(deleteSubmission(id, params.formId));
    }
  }
});

@connect(mapStateToProps, mapDispatchToProps)
export class Submissions extends React.Component<any, any> {
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
    const { form, submissions, submission, deleteSubmission, children } = this.props;

    if (!submissions.meta.initialized) {
      return <Spinner />;
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
        {React.Children.map(children, child => React.cloneElement(child as React.ReactElement<any>, { submission, deleteSubmission }))}
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
