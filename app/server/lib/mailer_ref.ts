import * as nodemailer from 'nodemailer';

let { MAILER_USERNAME, MAILER_PASSWORD, MAILER_PROVIDER } = process.env;

export const mailer = nodemailer.createTransport(`smtps://${MAILER_USERNAME}:${MAILER_PASSWORD}@${MAILER_PROVIDER}`, {
  from: 'Figure <notifications@figure-app.com>',
});
