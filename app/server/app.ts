'use strict';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Firebase from 'firebase';

import { parseForm } from './lib/parse_form'

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

app.post('/f/:id', (req, res) => {
  let submissionsRef = new Firebase(process.env.FIREBASE_URL).child(`submissions/${req.params.id}`);

  submissionsRef.push({ createdAt: Firebase.ServerValue.TIMESTAMP, fields: parseForm(req.body) });

  res.send('ok');
})

app.get('/*', (req, res) => {
  res.render('app');
});
