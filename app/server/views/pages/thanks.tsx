import * as React from 'react';

import { Page } from '../layouts/page';

import * as styles from './thanks.css.json';

export default () => (
  <Page className={styles.page}>
    <main className={styles.main}>
      <h1 className={styles.h1}>Thank you!</h1>
      <h2 className={styles.h2}>We have received your submission.</h2>

      <a className={styles.goBack} href="javascript:history.back()">Go Back</a>

      <footer className={styles.footer}>
        Powered by <a className={styles.footerLink} href={process.env.FIGURE_URL} target="_blank">Figure</a>.
      </footer>
    </main>
  </Page>
);
