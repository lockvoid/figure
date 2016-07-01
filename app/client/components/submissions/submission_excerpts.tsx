import * as React from 'react';

import { Link } from 'react-router';

import * as styles from './submission_excerpts.css!';

const dateFormat = require('dateformat');

export const SubmissionExcerpts = ({ form, submission }) => {
  const data = JSON.parse(submission.data);
  const [firstKey, secondKey] = Object.keys(data);

  return (
    <li className={styles.li} key={submission.id}>
      <Link className={styles.submission} activeClassName={styles.activeSubmission} to={`/forms/${form.id}/submissions/${submission.id}`}>
        <h3 className={styles.h3}>
          <span className={styles.firstExcerpt}>{firstKey && data[firstKey]}</span>
          <time className={styles.time}>{dateFormat(new Date(submission.created_at), 'dd/mm/yy HH:MM')}</time>
        </h3>

        <div className={styles.secondExcerpt}>{secondKey && data[secondKey]}</div>
      </Link>
    </li>
  );
};
