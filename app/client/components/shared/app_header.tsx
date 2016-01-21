import * as React from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';

interface FormLinksProps {
  forms: { value: List<any>, ready: boolean };
}

class FormLinks extends React.Component<FormLinksProps, {}> {
  render() {
    let { forms } = this.props;

    return (
      <ul>
        {
          forms.value.map(form =>
            <li key={form.$key}>
              <Link to={`/forms/${form.$key}`} activeClassName="active">
                <div>{form.name}</div>
              </Link>
            </li>
          )
        }
      </ul>
    )
  }
}

interface AppHeaderProps {
  forms: { value: List<any>, ready: boolean };
}

export class AppHeader extends React.Component<AppHeaderProps, {}> {
  render() {
    return (
      <header className="app">
        <Link to="/" className="logo">/* @include /public/images/figure.svg */</Link>

        <nav className="actions">
          <ul>
            <li>
              <Link to="/forms/new" activeClassName="active" className="new">
                /* @include /public/images/icons/plus.svg */ <div>New Form</div>
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="forms">
          <FormLinks {...this.props} />
        </nav>

        <nav className="account">
          <ul>
            <li>
              <Link to="/account" activeClassName="active">
                <div>Account</div>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <div>Logout</div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
