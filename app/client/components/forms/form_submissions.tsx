import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { bindSubmissions, unbindSubmissions } from '../../actions/submissions';
import { SubmissionsAside } from '../submissions/submissions_aside';
import * as React from 'react';

const stateToProps = (state, props) => {
  return { submissions: state.submissions, currentFormId: props.params.formId };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    mountSubmissions: (formId: string) => {
      dispatch(bindSubmissions(formId));
    },

    unmountSubmissions: () => {
      dispatch(unbindSubmissions());
    },

    onRedirectToFirstSubmission: (formId, submissionId) => {
      dispatch(routeActions.replace(`forms/${formId}/submissions/${submissionId}`));
    }
  }
}
@connect(stateToProps, dispatchToProps)
export class FormSubmissions extends React.Component<any, any> {
  componentWillMount() {
    let { mountSubmissions, currentFormId } = this.props;
    mountSubmissions(currentFormId);
  }

  componentWillUnmount() {
    let { unmountSubmissions } = this.props;
    unmountSubmissions();
  }

  componentWillReceiveProps(nextProps) {
    let { mountSubmissions, unmountSubmissions } = this.props;

    if (this.props.params.formId !== nextProps.params.formId) {
      unmountSubmissions();
      mountSubmissions(nextProps.params.formId);
    } else {
      this.redirectToFirstSubmissions(nextProps);
    }
  }

  redirectToFirstSubmissions(props) {
    let { params, submissions, onRedirectToFirstSubmission } = props;

    if (!params.submissionId && submissions.ready && submissions.value.size > 0) {
      onRedirectToFirstSubmission(params.formId, submissions.value.first().$key);
    }
  }

  render() {
    let { submissions, children, params } = this.props;

    return (
      <div className="form submissions">
        <SubmissionsAside submissions={submissions} formId={params.formId}/>
        { children || <div className="submission show" /> }
      </div>
    );
  }
}
