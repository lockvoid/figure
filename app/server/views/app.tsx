import * as React from 'react';

import Page from './layouts/page';
import { assetPath } from '../lib/asset_path';
import { AppSpinner } from '../../../lib/components/app_spinner';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Page bodyClass="app">
        <app id="app"><AppSpinner /></app>
        {this.bootstrap()}
      </Page>
    );
  }

  private bootstrap() {
    if (process.env.NODE_ENV === 'production') {
      return <script src={assetPath('app.js')} />
    }

    return (
      <div style={{ position: 'absolute', top: -9999 }}>
        <script src="/jspm_packages/system.js" />,
        <script src="/config.js" />,
        <script dangerouslySetInnerHTML={{ __html: `System.import('/assets/app/client/app').catch(console.log.bind(console))` }} />,
      </div>
    );
  }
}
