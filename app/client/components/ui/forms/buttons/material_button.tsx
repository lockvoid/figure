import * as React from 'react';

import { Spinner } from '../../../../../../lib/components/spinner';

import * as styles from './material_button.css.json!';

export const MaterialButton = ({ type = 'submit', theme = 'primary', submitting = false, children = undefined }) => (
  <button type={type} className={styles[theme]} disabled={submitting}>
    {submitting ? <Spinner theme="white" /> : children}
  </button>
);
