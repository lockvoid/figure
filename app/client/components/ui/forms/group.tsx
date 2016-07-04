import * as React from 'react';

import * as styles from './group.css.json!';

export const Group = ({ children = undefined }) => (
  <div className={styles.group}>{children}</div>
);
