import * as React from 'react';

import { Page } from '../layouts/page';
import { Header } from '../shared/header';
import { Footer } from '../shared/footer';

import * as styles from './home.css.json';

export default ({ isAuth }) => (
  <Page className={styles.page}>
    <Header theme="landing" isAuth={isAuth} />

    <main className={styles.main}>
      <section className={styles.overlay}>
        <div className={styles.hero}>
          <h1 className={styles.h1}>Painless forms for designers and developers.</h1>
          <h3 className={styles.h3}>Figure gives an endpoint to tech-savvy individuals like you, no matter how data is sent.</h3>

          <a className={styles.signup} href="/signup">Sign Up for Free</a>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h4 className={styles.h4}>Markup</h4>
          <p className={styles.p}>No more evil iFrame and CSS overrides. Write plain HTML and JavaScript for additional features.</p>
        </div>

        <div className={styles.feature}>
          <h4 className={styles.h4}>Webhooks</h4>
          <p className={styles.p}>Figure likes to talk with other apps. Use webhooks to keep other services in sync with incoming data.</p>
        </div>

        <div className={styles.feature}>
          <h4 className={styles.h4}>Reducers</h4>
          <p className={styles.p}>Data isn't static. Define a reducer that transforms incoming data. Fetch the result back later using our API.</p>
        </div>
      </section>

      <section className={styles.opensource}>
        <div className={styles.narrow}>
          <h2 className={styles.h2}>Open source</h2>
          <p className={styles.text}>Figure is a complete, production-ready, and open-sourced application powered by <a className={styles.a} href="https://therondb.com">Theron</a> - a reactive storage for realtime apps. Check out its <a className={styles.a} href="https://therondb.com/docs">documentation</a> and create amazing apps with Theron.</p>
        </div>
      </section>
    </main>

    <Footer />
  </Page>
);
