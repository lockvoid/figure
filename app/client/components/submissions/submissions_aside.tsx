import * as React from 'react';

import { Link } from 'react-router';

const dateFormat = require('dateformat');

export class SubmissionsAside extends React.Component<any, any> {
  render() {
    const { form, submissions } = this.props;

    return (
      <aside>
        <ul className="excerpts">
          {
            submissions.rows.map(submission => Object.assign({}, submission, { data: JSON.parse(submission.data) })).map(submission =>
              <li key={submission.id}>
                <Link to={`/forms/${form.id}/submissions/${submission.id}`} activeClassName="active">
                  <h3>
                    {submission.data[0] && submission.data[0].value}
                    <time>{dateFormat(new Date(submission.created_at), 'dd/mm/yy HH:MM')}</time>
                  </h3>

                  <div className="field">
                    {submission.data[1] && submission.data[1].value}
                  </div>
                </Link>
              </li>
            )
          }
        </ul>
      </aside>
    );
  }
}
