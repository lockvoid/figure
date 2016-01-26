'use strict';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as Firebase from 'firebase';
import * as request from 'request';
import * as crypto from 'crypto';

import { parseFields } from './lib/parse_fiels';
import { firebase } from './lib/firebase_ref';
import { SubmissionRedirect } from './lib/submission_redirect';
import { SubmissionMailer } from './lib/submission_mailer';
import { FormRecord } from '../../lib/models/form';
import { SubmissionRecord } from '../../lib/models/submission';
import { WebhookRecord } from '../../lib/models/webhook';

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

app.use(cookieParser())

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

app.post('/f/:formId', ({ params: { formId }, body }, res) => {
  const onError = (error: any) => {
    res.status(503).send('Something is technically wrong');
  }

  firebase.authWithCustomToken(process.env.FIREBASE_KEY, function(error, authData) {
    if (error) {
      return onError(error);
    }

    firebase.child('forms_users').child(formId).once('value', snapshot => {
      if (!snapshot.exists()) {
        return res.status(404).send('Form not found')
      }

      let userId = snapshot.val();

      firebase.child('forms').child(userId).child(formId).once('value', formSnapshot => {
        if (!snapshot.exists()) {
          return res.status(404).send('Form not found')
        }

        let submissionAttrs = { createdAt: Firebase.ServerValue.TIMESTAMP, unread: true, fields: parseFields(body) };

        let submissionRef = firebase.child('submissions').child(formId).push(submissionAttrs, (error) => {
          if (error) {
            return onError(error);
          }

          submissionRef.once('value', submissionSnapshot => {
            let formRecord = new FormRecord(formSnapshot);
            let submissionRecord = new SubmissionRecord(submissionSnapshot);

            // Mail

            if (formRecord.notifyMe) {
              new SubmissionMailer(userId, formRecord, submissionRecord).deliver();
            }

            // Webhook

            firebase.child('webhooks').child(formId).once('value', webhookSnapshot => {
              let webhookRecord = new WebhookRecord(webhookSnapshot);

              if (webhookRecord.url && webhookRecord.url.trim().indexOf('https://') === 0 ) {
                let submissionJson = {
                  form_id: formRecord.$key,
                  submission_id: submissionRecord.$key,
                  created_at: submissionRecord.createdAt,
                  fields: submissionSnapshot.val().fields,
                }

                let headers= {
                  'X-Figure-Event': 'new_submission',
                }

                if (webhookRecord.secret) {
                  headers['X-Figure-Signature'] = crypto.createHmac('sha1', 'key').update(JSON.stringify(submissionJson)).digest('hex')
                }

                request.post({
                  url: webhookRecord.url,
                  headers: headers,
                  form: {
                    submission: submissionJson
                  }
                }, (err) => {});
              }
            });

            // Redirect

            res.redirect(new SubmissionRedirect(formSnapshot, submissionSnapshot).url());
          }, onError);
        });
      }, onError);
    }, onError);
  });
})

const image = new Buffer([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
  0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
  0x02, 0x44, 0x01, 0x00, 0x3b
]);

app.get('/submissions/track/:keys.gif', ({ params, body }, res) => {
  let [formId, submissionId] = params.keys.match(/.{1,20}/g);

  firebase.child('submissions').child(formId).child(submissionId).once('value', submission => {
    if (submission.exists()) {
      submission.ref().update({ unread: false });
    };
  });

  res.writeHead(200, { 'Content-Type': 'image/gif' });
  res.end(image, 'binary');
});

app.get('/', (req, res) => {
  if (req.cookies.figureAuth === 'true') {
    res.render('app');
  } else {
    res.render('home');
  }
});

app.get('/*', (req, res) => {
  res.render('app');
});
