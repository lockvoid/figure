import * as React from 'react';

import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { NotFound } from '../shared/not_found';
import { deleteSubmission } from '../../actions/index';

const dateFormat = require('dateformat');

const mapStateToProps: MapStateToProps = ({ submissions }, { params }) => {
  return { submission: submissions.rows.find(submission => submission.id === params.submissionId), formId: params.formId };
}

const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch, { params }) => ({
  deleteSubmission: (id, formId) => {
    if (window.confirm("Do you really want to delete?")) {
      dispatch(deleteSubmission(id, formId));
    }
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export class ShowSubmission extends React.Component<any, any> {
  render() {
    const { submission, formId, deleteSubmission } = this.props;

    if (!submission) {
      return <NotFound message="Perhaps head back to the submission list?" />;
    }

    const createdAt = new Date(submission.created_at);

    return (
      <div className="submission show">
        <header>
          <time>Submitted on {dateFormat(createdAt, 'dd/mm/yy')} at {dateFormat(createdAt, 'HH:MM')}</time>

          <nav className="end">
            <button type="button" className="flat danger" onClick={() => deleteSubmission(submission.id, formId)}>Delete</button>
          </nav>
        </header>

        <ol className="fields">
          {
            JSON.parse(submission.data).map(field =>
              <li key={field.key}>
                <h4>{field.key}</h4>
                <div>{field.value}</div>
              </li>
            )
          }
        </ol>
      </div>
    );
  }
}
