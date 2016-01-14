import * as React from 'react';
import { render } from 'react-dom';

class App extends React.Component<any, any> {
  render() {
    return (
      <h1>Application</h1>
    );
  }
}

let bootstrap = (
  <App />
);

render(bootstrap, document.getElementById('app'));
