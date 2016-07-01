import * as React from 'react';

import { Link } from 'react-router';

import * as styles from './forms_aside.css!';

export const FormsAside = ({ forms }) => (
  <aside className={styles.container}>
    <Link className={styles.logo} to="/">/* @include /public/images/figure.svg */</Link>

    <nav className={styles.forms}>
      <Link className={styles.actionLink} activeClassName={styles.activeActionLink} to="/forms/new">
        /* @include app/client/components/forms/new_form.svg */ <div className={styles.actionLabel}>New Form</div>
      </Link>

      <section className={styles.scroller}>
          {
            forms.rows.map(form =>
              <Link className={styles.formLink} activeClassName={styles.activeFormLink} to={`/forms/${form.id}`} key={form.id}>
                <div className={styles.formLabel}>{form.name}</div>
              </Link>
            )
          }
      </section>
    </nav>

    <nav className={styles.settings}>
      <Link className={styles.systemLink} activeClassName={styles.systemActiveLink} to="/logout">
        <div className={styles.systemLabel}>Logout</div>
      </Link>
    </nav>
  </aside>
)
