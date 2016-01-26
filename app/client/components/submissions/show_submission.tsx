import * as React from 'react';
import { Dispatch } from 'redux';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { removeSubmissionAndRedirect, markSubmissionAsRead } from '../../actions/submissions';
import { findSubmission } from '../../reducers/submissions';
import { Link } from 'react-router';
import { absoluteTime } from '../../utils/absolute_time';

const stateToProps = (state, props) => {
  let submission = findSubmission(state.submissions, props.params.submissionId)
  return { submission };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    onRead: (formId: string, submissionId: string) => {
      dispatch(markSubmissionAsRead(formId, submissionId));
    },

    onRemove: (formId: string, submissionId: string) => {
      dispatch(removeSubmissionAndRedirect(formId, submissionId));
    },
  }
}

@connect(stateToProps, dispatchToProps)
export class ShowSubmission extends React.Component<any, any> {
  componentDidMount() {
    this.markAsRead(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.markAsRead(nextProps);
  }

  render() {
    let { submission, onRemove, params } = this.props;

    if (!submission) {
      return <div className="submission show" />
    }

    return (
      <div className="submission show">
        <header className="actions">
          <datetime>Submitted on {absoluteTime(submission.createdAt)}</datetime>

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

  private markAsRead(props) {
    let { onRead, params, submission } = props

    if (submission && !submission.read) {
      onRead(params.formId, submission.$key);
    }
  }
}
