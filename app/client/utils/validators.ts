const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/i;

export function combineValidators(rules: any) {
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
export function requiredValidator(value: any): string {
  if (!value) {
    return `Can't be blank`;
  }
}

export function emailValidator(value: string): string {
  if (!EMAIL_REGEX.test(value)) {
    return `Must look like an email address`;
  }
}

export function secureUrlValidator(value: string): string {
  if (value && value.trim().indexOf('https://') !== 0)  {
    return `Must be a secure url`;
  }
}


