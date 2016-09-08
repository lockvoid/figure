import * as React from 'react';

import { FieldProp } from 'redux-form';

import * as styles from './error.css.json!';

export const Error = ({ field: { error, touched } }) => (
  <div className={styles.error}>{error && touched ? error : <noscript />}</div>
);
