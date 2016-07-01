import * as React from 'react';

import * as styles from './label.css!';

export const Label = ({ field: { error, touched, active }, children = undefined }) => (
  <label className={styles[error && touched ? 'invalid' : (active ? 'focused' : 'default')]}>{children}</label>
);
