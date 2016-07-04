import * as React from 'react';

import { Page } from '../layouts/page';
import { Spinner } from '../../../../lib/components/spinner';
import { assetPath } from '../../utils/asset_path';

import * as styles from './app.css.json';

const includeJs = () => {
  if (process.env.NODE_ENV === 'production') {
    return <script src={assetPath('app.js')} />
  }

  return (
    <div className={styles.js}>
      <script src="/jspm_packages/system.js" />
      <script src="/config.js" />

      <script dangerouslySetInnerHTML={{ __html: `
        System.import('babel-polyfill'); System.import('app/client/client').catch(console.log.bind(console));
      ` }} />
    </div>
  );
}

export default () => (
  <Page className={styles.page}>
    <app id="app" className={styles.app}><Spinner /></app>
    {includeJs()}
  </Page>
);
