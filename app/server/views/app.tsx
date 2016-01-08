import * as React from 'react';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <html>
        <head>
          <base href="/" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <link rel="stylesheet" media="screen" href="assets/app.css" />
        </head>

        <body>
          <app id="app" />
        </body>
      </html>
    );
  }
}
