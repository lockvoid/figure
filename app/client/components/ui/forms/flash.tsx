import * as React from 'react';

import * as styles from './flash.css.json!';

export const Flash = ({ className="", level, visible = true, children = undefined }) => (
  visible ? <div className={`${styles[level]} ${className}`}>{children}</div> : <noscript />
);
