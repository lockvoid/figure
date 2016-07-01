import * as React from 'react';

import { FormsAside } from './forms_aside';

import * as styles from './forms_layout.css!';

export const FormsLayout = ({ forms, children = undefined }) => (
  <main className={styles.container}>
    <FormsAside forms={forms} />
    {children}
  </main>
)
