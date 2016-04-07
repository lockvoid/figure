import * as express from 'express';

import { UserRecord } from '../models';
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
