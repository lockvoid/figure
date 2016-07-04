import * as url from 'url';

export const assetPath = (filename: string): string => {
  const manifest = require('../../../../../dist/public/manifest.json');

  return `//${process.env.FIGURE_URL.replace(/^https?:\/\//, '')}/assets/${manifest[filename]}`
}
