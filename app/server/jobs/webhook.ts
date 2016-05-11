import * as request from 'request';

import { webhookQueue } from '../config/bull';

webhookQueue.process(async (job, done) => {
  const { url, body } = <any>job.data;

  request.post(url, { body, timeout: 10000, json: true }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      done(null, res);
    } else {
      done(err || new Error(`Server responded with ${res.statusCode}: ${body}`));
    }
  });
});
