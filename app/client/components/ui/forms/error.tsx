import * as React from 'react';

import { FieldProp } from 'redux-form';

import * as styles from './error.css!';

export const Error = ({ field: { error, touched } }) => (
  <div className={styles.error}>{error && touched ? error : null}</div>
);
