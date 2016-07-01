import * as React from 'react';

import * as styles from './not_found.css!';

export const NotFound = ({ message = 'Grats. You broke it.' }) => (
  <div className={styles.container}>
    <h2 className={styles.h2}>404</h2>
    <h3 className={styles.h3}>{message}</h3>
  </div>
)
