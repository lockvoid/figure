import * as React from 'react';

import { Spinner } from '../../../../../lib/components/spinner';

import * as styles from './submit.css!';

export const Submit = ({ className = "", submitting = false, children = undefined }) => (
  <button type="submit" className={`${styles.submit} ${className}`} disabled={submitting}>
    {submitting ? <Spinner /> : children}
  </button>
);
