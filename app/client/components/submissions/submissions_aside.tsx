import * as React from 'react';

import { SubmissionExcerpt } from './submission_excerpt';

export const SubmissionsAside = ({ form, submissions }) => (
  <aside>
    <ul className="excerpts">
      { submissions.rows.map(submission => <SubmissionExcerpt form={form} submission={submission} key={submission.id} />) }
    </ul>
  </aside>
);
