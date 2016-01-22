import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { firebase } from './firebase_ref';
import { mailer } from './mailer_ref';
import { SubmissionRecord } from '../../../lib/models/submission';

interface NewSubmissionMailProps extends React.Props<NewSubmissionMail> {
  form: any;
  submission: SubmissionRecord;
}

class NewSubmissionMail extends React.Component<NewSubmissionMailProps, {}> {
  submissionUrl(formId: string, submissionId: string): string {
    return `${process.env.FIGURE_URL}/forms/${formId}/submissions/${submissionId}`;
  }

  render() {
    let { form, submission } = this.props;

    return (
      <div>
        <h1>{form.name}</h1>

        <div>
          {
            submission.fields.map(field =>
              <div key={field.$key}>
                <h2>{field.$key}</h2><p>{field.$value}</p>
              </div>
            )
          }
        </div>

        <p style={{ fontSize: 'small', color: '#666' }}>
          &mdash;<br />View this submission on <a href={this.submissionUrl(form.$key, submission.$key)}>Figure</a>
        </p>

        <img src={`${process.env.FIGURE_URL}/submissions/track/${form.$key}${submission.$key}.gif`} height="1" width="1" />
      </div>
    );
  }
}

export class SubmissionMailer {
  constructor(private form: any, private submission: SubmissionRecord) {
  }

  deliver() {
    firebase.child('users').child(this.form.user).once('value', (user) => {
      if (user.exists()) {
        mailer.sendMail({ to: user.val().email, subject: this.subject(), html: this.render() });
      }
    });
  }

  private subject() {
    return `New submission for ${this.form.name}`;
  }

  private render(): string {
    let component = React.createElement(NewSubmissionMail, { form: this.form, submission: this.submission });

    return ReactDOMServer.renderToStaticMarkup(component);
  }
}
