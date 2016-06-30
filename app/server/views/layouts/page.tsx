import * as React from 'react';

import { assetPath } from '../../utils/asset_path';
import { Metrika } from '../shared/metrika';

export const Page = ({ title = null, children = null, className = null }) => (
  <html>
    <head>
      <title>{title && `${title} - `}Figure</title>

      <meta name="description" content="Painless forms for designers and developers." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="stylesheet" media="screen" href={assetPath('app.css')} />

      /* @ifdef METRIKA_APP */ <Metrika app={/* @echo METRIKA_APP */} /> /* @endif */
    </head>

    <body className={className}>
      {children}
    </body>
  </html>
);
