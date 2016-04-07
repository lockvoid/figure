import * as React from 'react';

import { assetPath } from '../../utils/asset_path';

export const Page = ({ title = null, children = null, className = null }) => (
  <html>
    <head>
      <title>{title && `${title} - `}Figure</title>

      <base href="/" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="stylesheet" media="screen" href={assetPath('app.css')} />
    </head>

    <body className={className}>
      {children}
    </body>
  </html>
);
