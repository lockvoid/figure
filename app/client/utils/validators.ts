const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

const EMAIL_REGEX = /^\S+@\S+\.\S+$/i;

export function required(value: any): string {
  if (!value) {
    return 'Required';
  }
}

export function emails(value) {
  if (value) {
    let emails = (value.split(',') as string[]).map(email => email.trim()).filter(email => !!email);

    for (let email of emails) {
      if (!EMAIL_REGEX.test(email)) {
        return 'Emails';
      }
    }
  }
}

export function createValidator(rules: any) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
