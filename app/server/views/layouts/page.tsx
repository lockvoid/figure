import * as React from 'react';

export default class Page extends React.Component<any, any> {
  render() {
    return (
      <html>
        <head>
          <base href="/" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <link rel="stylesheet" media="screen" href="assets/app.css" />
        </head>

        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}
