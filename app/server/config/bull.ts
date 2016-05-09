import * as bull from 'bull';
import * as url from 'url';

export const DEFAULT_QUEUE_OPTIONS = { attempts: 5, backoff: { type: 'exponential', delay: 3000 } };

const { port, hostname, auth } = url.parse(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

function createQueue(id: string) {
  const queue = bull(id, parseInt(port), hostname, { auth_pass: String(auth).split(':')[1] });

  queue.on('failed', (job, err) => {
    console.log(err);
  });

  return queue;
}

export const emailQueue = createQueue('email');
