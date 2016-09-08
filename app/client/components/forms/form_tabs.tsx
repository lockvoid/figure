import * as React from 'react';

import { Link } from 'react-router';

import * as styles from './form_tabs.css.json!';

interface FormTabsProps {
  form: any
}

export class FormTabs extends React.Component<FormTabsProps, {}> {
  render() {
    return (
      <nav className={styles.container}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link className={styles.tab} activeClassName={styles.activeTab} to={this._pathTo('submissions')}>Submissions</Link>
          </li>

          <li className={styles.li}>
            <Link className={styles.tab} activeClassName={styles.activeTab} to={this._pathTo('setup')}>Setup</Link>
          </li>

          <li className={styles.li}>
            <Link className={styles.tab} activeClassName={styles.activeTab} to={this._pathTo('edit')}>Edit</Link>
          </li>

          <li className={styles.li}>
            <div className={styles.feature}>Export</div>
          </li>

          <li className={styles.li}>
            <Link className={styles.tab} activeClassName={styles.activeTab} to={this._pathTo('webhooks')}>Webhooks</Link>
          </li>

          <li className={styles.li}>
            <div className={styles.feature}>Reducers</div>
          </li>
        </ul>
      </nav>
    );
  }

  protected _pathTo(path: string) {
    return `forms/${this.props.form.id}/${path}`;
  }
}
