import * as React from 'react';

import Page from './layouts/page';

export default class Home extends React.Component<{}, {}> {
  render() {
    return (
      <Page>
        <h1>Home</h1>
        <a href="/login">Login</a>
      </Page>
    );
  }
}
