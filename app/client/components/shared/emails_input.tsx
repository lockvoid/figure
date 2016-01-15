import * as React from 'react';

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/i;

export class EmailsInput extends React.Component<any, any> {
  latestValue: string = '';

  getValue(): string {
    let value = this.props.value || this.props.initialValue;

    return this.latestValue || (Array.isArray(value) ? value.join(', ') : value);
  }

  setValue(event: React.FormEvent) {
    this.latestValue = (event.target as HTMLInputElement).value;

    return this.latestValue.split(',').map(email => email.trim()).filter(email => !!email);
  }

  onChange(event: React.FormEvent) {
    this.props.onChange(this.setValue(event));
  }

  onBlur(event: React.FormEvent) {
    this.props.onBlur(this.setValue(event));
  }

  render() {
    return <input {...this.props} onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={this.getValue()} />
  }
}

export function emailsValidator(emails: string[]) {
  if (!emails) return;

  for (let email of emails) {
    if (!EMAIL_REGEX.test(email)) {
      return 'Emails';
    }
  }
}
