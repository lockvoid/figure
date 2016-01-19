import * as React from 'react';

import Page from './layouts/page';
import { AppSpinner } from '../../../lib/components/app_spinner';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <Page className="app">
        <app id="app"><AppSpinner /></app>

        <script src="/jspm_packages/system.js"></script>
        <script src="/config.js"></script>

        <script dangerouslySetInnerHTML={{__html: `
          System.import('/assets/app/client/app').catch(console.log.bind(console));
        `}} />
      </Page>
    );
  }
}

