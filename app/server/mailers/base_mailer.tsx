import * as React from 'react';
import * as ReactDOM from 'react-dom/server';

import { sendgrid } from '../config/sendgrid';

const BaseTemplate = ({ children }) => (
  <div>{children}</div>
);

export abstract class BaseMailer {
  protected _from: string = '<notifications@figure-app.com>';
  protected _fromName: string = 'Figure';

  /* abstract */ protected _template: React.ComponentClass<{}> | React.StatelessComponent<{}>;

  constructor(protected _to: string, protected _toName: string, protected _props?: any) {
  }

  send(): Promise<any> {
    return new Promise((resolve, reject) => {
      sendgrid.send({ to: this._to, toname: this._toName, from: this._from, fromname: this._fromName, subject: this._subject(), html: this._render() }, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }

  /* abstract */ protected _subject(): string {
    throw 'Subject is required';
  }

  protected _render(): string {
    const template = <BaseTemplate children={React.createElement(this._template, this._props)} />;

    return ReactDOM.renderToStaticMarkup(template);
  }
}
