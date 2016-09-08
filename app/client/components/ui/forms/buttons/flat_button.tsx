import * as React from 'react';

import { Spinner } from '../../../../../../lib/components/spinner';

import * as styles from './flat_button.css.json!';

export const FlatButton = ({ type = 'submit', theme = 'primary', submitting = false, onClick = undefined, children = undefined }) => (
  <button type={type} className={styles[theme]} disabled={submitting} onClick={onClick}>
    {submitting ? <Spinner /> : children}
  </button>
);
