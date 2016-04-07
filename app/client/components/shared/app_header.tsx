import * as React from 'react';

import { Link } from 'react-router';

export class AppHeader extends React.Component<any, any> {
  render() {
    // const { forms } = this.props;

    var forms = { rows: [] };

    return (
      <header className="primary">
        <Link to="/" className="logo">/* @include /public/images/figure.svg */</Link>

        <nav className="actions">
          <Link to="/forms/new" activeClassName="active" className="new">
            /* @include /public/images/icons/plus.svg */ <div>New Form</div>
          </Link>
        </nav>

        <nav className="forms">
          <wrapper>
            {
              forms.rows.map(form =>
                <Link to={`/forms/${form.id}`} key={form.id} activeClassName="active">
                  <div>{form.name}</div>
                </Link>
              )
            }
          </wrapper>
        </nav>

        <nav className="account">
          <Link to="/logout">
            <div>Logout</div>
          </Link>
        </nav>
      </header>
    );
  }
}
