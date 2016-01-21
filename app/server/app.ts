'use strict';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Firebase from 'firebase';

import { parseFields } from './lib/parse_fiels';
import { firebase } from './lib/firebase_ref';
import { SubmissionRedirect } from './lib/submission_redirect';

import '../../lib/polyfills';

export const app = express();

app.engine('js', (filename: string, options: any, done: Function) => {
  var markup = '<!DOCTYPE html>';

  try {
    let component = require(filename).default;

    markup += ReactDOMServer.renderToStaticMarkup(React.createElement(component, options));
  } catch (e) {
    return done(e);
  }

  done(null, markup);
});

app.set('views', `${__dirname}/views`);
app.set('view engine', 'js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals = {
  development: app.get('env') === 'development',
};

['./dist/public', './dist/client'].forEach(path => {
  app.use('/assets', express.static(path));
});

if (app.get('env') === 'development') {
  ['/node_modules', '/jspm_packages'].forEach(path => {
    app.use(path, express.static(`.${path}`));
  });

  app.get('/config.js', (req, res) => {
    res.sendFile(`${process.cwd()}/config.js`);
  });
}

app.use((req, res, next) => {
  req.path.indexOf("/assets") === 0 ? res.status(404).send(`Cannot GET ${req.path}`) : next();
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/thankyou', (req, res) => {
  res.render('thankyou');
});

app.post('/f/:formId', ({ params, body }, res) => {
  firebase.child('forms').child(params.formId).once('value', form => {
    if (form.exists()) {
      let attrs = { createdAt: Firebase.ServerValue.TIMESTAMP, fields: parseFields(body) };

      let submission = firebase.child('submissions').child(params.formId).push(attrs, (error) => {
        if (error) {
          res.status(503).send('Something is technically wrong');
        } else {
          submission.once('value', submission => {
            let redirectUrl = new SubmissionRedirect(form, submission).url();

            res.redirect(redirectUrl);
          }, (error: any) => {
            res.status(503).send('Something is technically wrong');
          });
        }
      });
    } else {
      res.status(404).send('Form not found')
    }
  }, (error: any) => {
    res.status(503).send('Something is technically wrong');
  });
})

app.get('/*', (req, res) => {
  res.render('app');
});
