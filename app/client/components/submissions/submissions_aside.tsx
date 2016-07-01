import * as React from 'react';

import { SubmissionExcerpts } from './submission_excerpts';

import * as styles from './submissions_aside.css!';

export const SubmissionsAside = ({ form, submissions }) => (
  <aside className={styles.container}>
    <ul className={styles.excerpts}>
      { submissions.rows.map(submission => <SubmissionExcerpts form={form} submission={submission} key={submission.id} />) }
    </ul>
  </aside>
);
