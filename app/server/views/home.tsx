import * as React from 'react';

import Page from './layouts/page';

export default class Home extends React.Component<{}, {}> {
  render() {
    return (
      <Page>
        <div onClick={() => alert()}>Home</div>
      </Page>
    );
  }
}
