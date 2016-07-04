import * as React from 'react';

import * as styles from './input.css.json!';

export const Input = ({ field: { error, touched, active }, field, type, placeholder = "" }) => (
  <input className={styles[error && touched ? 'invalid' : (active ? 'focused' : 'default')]} type={type} placeholder={placeholder} {...field} />
);
