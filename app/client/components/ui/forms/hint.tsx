import * as React from 'react';

import * as styles from './hint.css.json!';

export const Hint = ({ children = undefined }) => (
  <div className={styles.hint}>{children}</div>
);
