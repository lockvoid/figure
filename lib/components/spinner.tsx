import * as React from 'react';

import * as styles from './spinner.css.json/* @ifndef NODE_BUILD */!/* @endif */';

export const Spinner = ({ theme = "" }) => {
  const themeClassName = [styles.spinner, styles[`spinner--${theme}`]].join(' ');

  return (
    <spinner className={themeClassName}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </spinner>
  );
};
