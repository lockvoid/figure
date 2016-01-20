import * as React from 'react';

import Page from './layouts/page';

export default class Thankyou extends React.Component<{}, {}> {
  render() {
    return (
      <Page bodyClass="thankyou">
        <main>
          <section className="thankyou">
            <h1>Thank you!</h1>
            <h2>We have received your submission.</h2>
            <a className="button" href="javascript:history.back()">Go Back</a>
          </section>

          <footer className="copyright">
            <p>Powered by <a href="https://figureapp.com" target="_blank">Figure</a></p>
          </footer>
        </main>
      </Page>
    );
  }
}
