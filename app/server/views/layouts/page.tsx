import * as React from 'react';

export interface PageProps extends React.Props<Page> {
  title?: string;
  bodyClass?: string;
}

export default class Page extends React.Component<PageProps, {}> {
  render() {
    let { children, title, bodyClass } = this.props;

    return (
      <html>
        <head>
          <title>{title && `${title} - `}Figure</title>

          <base href="/" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <link rel="stylesheet" media="screen" href="assets/app.css" />
        </head>

        <body className={bodyClass}>
          {children}
        </body>
      </html>
    );
  }
}
