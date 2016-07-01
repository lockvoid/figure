import * as React from 'react';

import { FieldProp } from 'redux-form';

import * as styles from './checkbox.css!';

export const Checkbox = ({ field, children = undefined }) => (
  <label className={styles.checkbox}>
    <input type="hidden" {...field} value="false" />
    <input className={styles.input} type="checkbox" {...field} />

    <i className={field.value ? styles.checked : styles.unchecked}>
      /* @include app/client/components/ui/forms/checkbox.svg */
    </i>

    <span className={styles.label}>{children}</span>
  </label>
);
