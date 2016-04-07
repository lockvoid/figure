import * as url from 'url';

if (process.env.NODE_ENV == 'production') {
  var manifest = require('../../../../../dist/public/manifest.json');
  var baseUrl = `//${process.env.THERON_URL.replace(/^https?:\/\//, '')}/assets`;
} else {
  var baseUrl = '/assets';
}

export const assetPath = (filename: string): string => {
  if (process.env.NODE_ENV == 'production') {
    return `${baseUrl}/${manifest[filename]}`;
  } else {
    return `${baseUrl}/${filename}`;
  }
}
