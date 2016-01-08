import * as React from 'react';

import Page from './layouts/page';

class DevelopmentConfig extends React.Component<any, any> {
  render() {
    return (
      <div style={{ position: "absolute", top: -9999 }}>
        <script src="/jspm_packages/system.js"></script>
        <script src="/config.js"></script>

        <script dangerouslySetInnerHTML={{__html: `
          System.import('/assets/app/client/app').catch(console.log.bind(console));
        `}} />
      </div>
    );
  }
}

export default class App extends React.Component<any, any> {
  render() {
    return (
      <Page>
        <app id="app">Loading...</app>
        <DevelopmentConfig />
      </Page>
    );
  }
}
