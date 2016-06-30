import * as React from 'react';

import * as styles from './not_found.css!';

export const NotFound = ({ message = 'Grats. You broke it.' }) => (
  <div className={styles.notFound}>
    <h2>404</h2>
    <h3>{message}</h3>
  </div>
)
