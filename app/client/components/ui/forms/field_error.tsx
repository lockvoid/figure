import * as React from 'react';

import { FieldProp } from 'redux-form';

export const FieldError = ({ error, touched }: FieldProp) => (
  <div className="error">
    {error && touched ? error : null}
  </div>
);
