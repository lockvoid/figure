import * as React from 'react';

import * as styles from './validator.css!';

export const Validator = ({ visible = false, children = undefined }) => (
  visible ? <span className={styles.validator}>{children}</span> : null
);
