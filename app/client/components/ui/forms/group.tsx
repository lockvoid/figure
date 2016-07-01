import * as React from 'react';

import * as styles from './group.css!';

export const Group = ({ children = undefined }) => (
  <div className={styles.group}>{children}</div>
);
