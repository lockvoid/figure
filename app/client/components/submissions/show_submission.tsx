import * as React from 'react';
import { Dispatch } from 'redux';
import { routeActions } from 'redux-simple-router';
import { connect } from 'react-redux';
import { removeSubmissionAndRedirect } from '../../actions/submissions';
import { findSubmission } from '../../reducers/submissions';
import { AppSpinner } from '../../components/shared/app_spinner';
import { Link } from 'react-router';
import { formatDate } from '../../utils/format_date';

const stateToProps = (state, props) => {
  return { submission: findSubmission(state.submissions, props.params.submissionId) };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    onRemove: (formId: string, submissionId: string) => {
      dispatch(removeSubmissionAndRedirect(formId, submissionId));
    },
  }
}

@connect(stateToProps, dispatchToProps)
export class ShowSubmission extends React.Component<any, any> {
  formatCreatedAt(createdAt: number) {
    let date = new Date(createdAt);



  }

  render() {
    let { submission, onRemove, params } = this.props;

    if (!submission) {
      return <AppSpinner />;
    }

    return (
      <div className="submission show">
        <header className="actions">
          <datetime>Submitted on {formatDate(submission.createdAt, 'ddd, mmm d, yyyy, h:MM TT')}</datetime>

          <nav className="right">
            <button type="button" className="delete" onClick={() => onRemove(params.formId, submission.$key)}>Delete</button>
          </nav>
        </header>

        <ol className="fields">
          {
            submission.fields.map(field =>
              <li key={field.$key}>
                <h4>{field.$key}</h4>
                <div>{field.$value}</div>
              </li>
            )
          }
        </ol>
      </div>
    );
  }
}
