import { CSSLoader, Plugins } from 'jspm-loader-css';

import postcssColorFunction from 'postcss-color-function';
import postcssNested from 'postcss-nested';

const { fetch, bundle } = new CSSLoader([
  postcssColorFunction,
  postcssNested,
  Plugins.values,
  Plugins.localByDefault,
  Plugins.extractImports,
  Plugins.scope,
  Plugins.autoprefixer(),
], __moduleName);

export { fetch, bundle };
