import * as React from 'react';

import * as styles from './setup_form.css!';

export const SetupForm = ({ current: { form } }) => (
  <article className={styles.container}>
    <h2 className={styles.h2}>Don't have a form yet?</h2>

    <p className={styles.p}>If you don't have a form yet use the form markup below as a starting point, i.e. copy and paste it to your site. From the form below, Figure will collect a user name and email address. You can add whatever fields you need, but the action attribute should be set to the Figure endpoint:</p>

    <pre className={styles.code}>
      <code>
{
`<form action="/* @echo FIGURE_URL *//f/${form.key}" method="post">
  <input type="hidden" name="utf8" value="✓">
  <input type="text" name="name" placeholder="Your name">
  <input type="email" name="email" placeholder="Your email">
  <button type="submit">Submit</button>
</form>`
}
      </code>
    </pre>

    <h2 className={styles.h2}>Have a form already?</h2>

    <p className={styles.p}>If you already have a form, just change its action attribute to <code className={styles.inline}>{`https://figure-app.com/${form.key}`}</code> in order to point your future form submissions to Figure. Your form tag should be pretty close to this:</p>

    <pre className={styles.code}>
      <code>
{
`<form action="/* @echo FIGURE_URL *//f/${form.key}" method="post">`
}
      </code>
    </pre>

    <h2 className={styles.h2}>What's next?</h2>

    <p className={styles.p}>Once you have done one of the steps below, test it by submitting a form, and if it's done correctly, a form submission will immediately appear in the submissions section. Note that Figure categorizes submission data by the name attribute of fields.</p>
  </article>
);
