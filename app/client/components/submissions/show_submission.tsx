import * as React from 'react';

import { NotFound } from '../pages/not_found';

const dateFormat = require('dateformat');

//import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
//const mapStateToProps: MapStateToProps = ({ submissions }, { params }) => {
//  return { submission: submissions.rows.find(submission => submission.id === params.submissionId), formId: params.formId };
//}
//
//const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch, { params }) => ({
//  deleteSubmission: (id, formId) => {
//    if (window.confirm("Do you really want to delete?")) {
//      dispatch(deleteSubmission(id, formId));
//    }
//  },
//});
//
//@connect(mapStateToProps, mapDispatchToProps)
export class ShowSubmission extends React.Component<any, any> {
  render() {
    const { submission, deleteSubmission } = this.props;

    if (!submission) {
      return <NotFound message="Perhaps head back to the submission list?" />;
    }

    const createdAt = new Date(submission.created_at);
    const data = JSON.parse(submission.data);

    return (
      <div className="submission show">
        <header>
          <time>Submitted on {dateFormat(createdAt, 'dd/mm/yy')} at {dateFormat(createdAt, 'HH:MM')}</time>

          <nav className="end">
            <button type="button" className="flat danger" onClick={() => deleteSubmission(submission.id)}>Delete</button>
          </nav>
        </header>

        <ol className="fields">
          {
            Object.keys(data).map(field =>
              <li key={field}>
                <h4>{field}</h4><div>{data[field]}</div>
              </li>
            )
          }
        </ol>
      </div>
    );
  }
}
