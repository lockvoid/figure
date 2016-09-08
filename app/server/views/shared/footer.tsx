import * as React from 'react';

import * as styles from './footer.css.json';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <p className={styles.p}>
        © <a className={styles.a} href="https://therondb.com">Theron</a> 2016 under the terms of the <a className={styles.a} href="https://github.com/therondb/figure/blob/master/LICENSE">MIT License</a>.
      </p>
    </div>
  </footer>
);
