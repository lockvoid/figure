import * as express from 'express';

import { Theron } from 'theron';
import { UserRecord, FormRecord, SubmissionRecord } from '../models';
import { AuthError, NotFoundError } from '../lib/errors';
import { wrap } from '../utils/wrap_async';
import { signUser } from '../utils/sign_user';

export const api = express.Router();

api.post('/tokens', wrap(async ({ body }, res, next) => {
  const user = await UserRecord.auth(body.email, body.password);

  if (!user) {
    return next(new AuthError(403, 'Wrong email or password'));
  }

  res.json({ token: signUser(user) });
}));

api.post('/users', wrap(async ({ body }, res, next) => {
  const user = await UserRecord.query().insert(body);

  res.json({ id: user.id });
}));

api.get('/users/email/:email/uniqueness', wrap(async ({ params, query }, res, next) => {
  const { count } = await UserRecord.query().where('email', params.email).whereNot('id', query.id).count('id').first();

  res.json(parseInt(count) === 0);
}));

// Protected area

api.use((req, res, next) => {
  if (req.currentUser) {
    return next();
  }

  next(new AuthError(401, 'Failed to authenticate token'));
});

// Forms

api.get('/forms', ({ currentUser }, res) => {
  const submissionsCount = SubmissionRecord.query().whereRef('forms.id', '=', 'submissions.form_id').count().as('submissions_count');
  const query = currentUser.$relatedQuery('forms').select('*', submissionsCount).orderBy('name').toString();
  const signature = Theron.sign(query, process.env['THERON_SECRET']);

  res.json({ query, signature });
});

api.post('/forms', wrap(async ({ currentUser, body }, res, next) => {
  const form = await currentUser.$relatedQuery('forms').insert(body);

  res.json({ id: form.id });
}));

api.patch('/forms/:formId', wrap(async ({ currentUser, params, body }, res, next) => {
  const form = await currentUser.$relatedQuery('forms').patchAndFetchById(params.formId, body);

  res.json({});
}));

api.delete('/forms/:formId', wrap(async ({ currentUser, params }, res, next) => {
  const form = await currentUser.$relatedQuery('forms').where('id', params.formId).delete();

  res.json({});
}));

// Submissions

api.get('/forms/:formId/submissions', wrap(async ({ currentUser, params }, res) => {
  const form = await currentUser.$relatedQuery('forms').where('id', params.formId).first();
  const query = form.$relatedQuery('submissions').orderBy('created_at', 'desc').toString();
  const signature = Theron.sign(query, process.env['THERON_SECRET']);

  res.json({ query, signature });
}));

api.delete('/submissions/:submissionId', wrap(async ({ currentUser, params }, res) => {
  const submission = await SubmissionRecord.query().where('id', params.submissionId).first();

  if (!submission) {
    return res.status(404).send('Submission not found');
  }

  const form = await currentUser.$relatedQuery('forms').where('id', submission.form_id).first();

  if (!form) {
    return res.status(403).send('Access denied');
  }

  await SubmissionRecord.query().where('id', params.submissionId).delete();

  res.json({});
}));
