import * as React from 'react';

export const NotFound = ({ message = 'Grats. You broke it.' }) => (
  <div className="notfound">
    <h2>404</h2>
    <h3>{message}</h3>
  </div>
)

