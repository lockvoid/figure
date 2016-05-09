import * as React from 'react';

import { BaseMailer } from './base_mailer';

class SubmissionTemplate extends React.Component<any, {}> {
  render() {
    const { form, submission } = this.props;

    return (
      <div>
        <h1>{form.name}</h1>

        <div>
          {
            submission.data.map(field =>
              <div key={field.key}>
                <h2>{field.key}</h2>
                <p>{field.value}</p>
              </div>
            )
          }
        </div>

        <p style={{ fontSize: 'small', color: '#666' }}>
          &mdash;<br />View this submission on <a href={this._submissionUrl()}>Figure</a>
        </p>
      </div>
    );
  }

  protected _submissionUrl(): string {
    const { form, submission } = this.props;

    return `${process.env.FIGURE_URL}/forms/${form.id}/submissions/${submission.id}`;
  }
}

export class SubmissionMailer extends BaseMailer {
  protected _template = SubmissionTemplate;

  protected _subject(): string {
    return `New submission for ${this._props.form.name}`;
  }
}
