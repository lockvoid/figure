import * as React from 'react';

import { Spinner } from '../../../../../lib/components/spinner';

export const SubmitButton = ({ title, submitting, className } : { title: string, className?: string, submitting?: boolean }) => (
  <button type="submit" className={`raised primary ${className}`} disabled={submitting}>
    {submitting ? <Spinner /> : title}
  </button>
);
