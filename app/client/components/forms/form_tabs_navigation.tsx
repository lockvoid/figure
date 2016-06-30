import * as React from 'react';

import { Link } from 'react-router';

export class FormTabsNavigation extends React.Component<any, any> {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to={this._pathTo('submissions')} activeClassName="active">Submissions</Link>
          </li>
          <li>
            <Link to={this._pathTo('setup')} activeClassName="active">Setup</Link>
          </li>
          <li>
            <Link to={this._pathTo('edit')} activeClassName="active">Edit</Link>
          </li>
          <li>
            <div className="feature">Export</div>
          </li>
          <li>
            <Link to={this._pathTo('webhooks')} activeClassName="active">Webhooks</Link>
          </li>
          <li>
            <div className="feature">Reducers</div>
          </li>
        </ul>
      </nav>
    );
  }

  protected _pathTo(path: string) {
    return `forms/${this.props.form.id}/${path}`;
  }
}
