'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';
import * as crypto from 'crypto';

import { ValidationError } from 'objection';
import { UserRecord, FormRecord, SubmissionRecord } from './models';
import { BaseError } from '../../lib/errors/base_error';
import { SubmissionMailer } from './mailers';
import { emailQueue, webhookQueue, DEFAULT_QUEUE_OPTIONS } from './config/bull';
import { api } from './routes/api';
import { wrap } from './utils/wrap_async';

export const app = express();

// Parse params

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies

app.use(cookieParser())

// JWT-based auth

app.use(wrap(async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['X-JWT-Token'.toLowerCase()];

  if (token) {
    try {
      const auth = jwt.verify(token, process.env['JWT_SECRET']);

      req.currentUser = await UserRecord.query().where('id', auth.userId).first();
    } catch(error) {
      if (error.name !== 'JsonWebTokenError' && error.name !== 'TokenExpiredError') {
        return next(error);
      }
    }
  }

  next();
}));

// Configure views

app.engine('js', (filename: string, options: any, done: Function) => {
  var markup = '<!DOCTYPE html>';

  try {
    const component = require(filename).default;

    markup += ReactDOM.renderToStaticMarkup(React.createElement(component, options));
  } catch (e) {
    return done(e);
  }

  done(null, markup);
});

app.set('views', `${__dirname}/views`);
app.set('view engine', 'js');

app.locals = {
  development: app.get('env') === 'development',
};

// Serve assets

app.use('/assets', express.static('./dist/public'));

app.use((req, res, next) => {
  req.path.indexOf("/assets") === 0 ? res.status(404).send(`Cannot GET ${req.path}`) : next();
});

if (app.get('env') === 'development') {
  app.use('/', express.static('./dist/client'));
  app.use('/', express.static('./'));

  app.get('/config.js', (req, res) => {
    res.sendFile(`${process.cwd()}/config.js`);
  });
}

app.use((req, res, next) => {
  req.path.indexOf("/assets") === 0 ? res.status(404).send(`Cannot GET ${req.path}`) : next();
});

// Declare API

app.use('/api', api);

// Error handler

app.use(<express.ErrorRequestHandler>((err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.code).json({ reason: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ reason: JSON.parse(err.message) });
  }

  next(err);
}));

// Handle submissions

app.post('/f/:formKey', wrap(async ({ params: { formKey }, body }, res) => {
  const form = await FormRecord.query().where({ key: formKey }).first();

  if (!form) {
    return res.status(404).send('Form not found');
  }

  const submission = await form.$relatedQuery('submissions').insert({ data: body });

  if (form.notify_me) {
    emailQueue.add({ mailer: 'SubmissionMailer', userId: form.user_id, props: { form, submission } }, DEFAULT_QUEUE_OPTIONS);
  }

  if (form.webhook_url) {
    webhookQueue.add({ url: form.webhook_url, body: submission.toJSON() } , DEFAULT_QUEUE_OPTIONS);
  }

  res.redirect(form.redirect_to || '/thanks');
}));

app.get('/home', (req, res) => {
  res.render('pages/home', { isAuth: req.cookies.theronAuth === 'true' });
});

app.get('/thanks', (req, res) => {
  res.render('pages/thanks');
});

app.get('/', (req, res) => {
  if (req.cookies.figureAuth === 'true') {
    res.render('pages/app');
  } else {
    res.render('pages/home');
  }
});

app.get('/*', (req, res) => {
  res.render('pages/app');
});
