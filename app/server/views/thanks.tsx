import * as React from 'react';

import { Page } from './layouts/page';

export default () => (
  <Page className="thanks">
    <main>
        <h1>Thank you!</h1>
        <h2>We have received your submission.</h2>

        <a className="button raised primary" href="javascript:history.back()">Go Back</a>

        <footer>
          Powered by <a href={process.env.FIGURE_URL} target="_blank">Figure</a>.
        </footer>
    </main>
  </Page>
);
