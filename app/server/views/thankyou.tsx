import * as React from 'react';

import Page from './layouts/page';

export default class Thankyou extends React.Component<{}, {}> {
  render() {
    return (
      <Page>
        <h1>Thank You!</h1>
        <p>We have received your submission.</p>
        <a href="javascript:history.back()">Go Back</a>
      </Page>
    );
  }
}
