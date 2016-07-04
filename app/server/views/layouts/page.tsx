import * as React from 'react';

import { assetPath } from '../../utils/asset_path';
import { Metrika } from '../shared/metrika';

const glob = require('glob');

const includeCss = () => {
  if (process.env.NODE_ENV == 'production') {
    return <link rel="stylesheet" media="screen" href={assetPath('app.css')} />;
  }

  return glob.sync('dist/**/*.css').map(file =>
    <link rel="stylesheet" media="screen" href={file} key={file} />
  );
}

export const Page = ({ title = null, children = null, className = null }) => (
  <html>
    <head>
      <title>{title && `${title} - `}Figure</title>

      <base href="/" />

      <meta name="description" content="Painless forms for designers and developers." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {includeCss()}

      /* @ifdef METRIKA_APP */ <Metrika app={/* @echo METRIKA_APP */} /> /* @endif */
    </head>

    <body className={className}>
      {children}
    </body>
  </html>
);
