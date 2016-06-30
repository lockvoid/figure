import * as React from 'react';

import { Link } from 'react-router';

const dateFormat = require('dateformat');

export const SubmissionExcerpt = ({ form, submission }) => {
  const data = JSON.parse(submission.data);
  const [firstField, secondField] = Object.keys(data);

  return (
    <li key={submission.id}>
      <Link to={`/forms/${form.id}/submissions/${submission.id}`} activeClassName="active">
        <h3>
          {firstField && data[firstField]}
          <time>{dateFormat(new Date(submission.created_at), 'dd/mm/yy HH:MM')}</time>
        </h3>

        <div className="field">
          {secondField && data[secondField]}
        </div>
      </Link>
    </li>
  );
};
