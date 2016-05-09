import * as bull from 'bull';
import * as mailers from '../mailers';

import { UserRecord } from '../models';
import { emailQueue } from '../config/bull';

emailQueue.process(async (job) => {
  const { mailer, userId, props } = <any>job.data;

  const user = await UserRecord.query().where('id', userId).first();

  return new mailers[mailer](user.email, user.name, props).send();
});
