import * as React from 'react';

import { SubmissionsAside } from './submissions_aside';

import * as styles from './submissions_layout.css!';

export const SubmissionsLayout = ({ form, submissions, children = undefined }) => (
  <section className={styles.container}>
    <SubmissionsAside form={form} submissions={submissions} />
    {children}
  </section>
);
