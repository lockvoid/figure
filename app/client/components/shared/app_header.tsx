import * as React from 'react';
import { Link } from 'react-router';
import { AppSpinner } from './app_spinner';
import { List } from 'immutable';

interface FormLinksProps {
  forms: { value: List<any>, ready: boolean };
}

class FormLinks extends React.Component<FormLinksProps, {}> {
  render() {
    let { forms } = this.props;

    if (!forms.ready) {
      return <AppSpinner />
    }

    return (
      <ul>
        {
          forms.value.map(form =>
            <li key={form.$key}>
              <Link to={`/forms/${form.$key}`} activeClassName="active">{form.name}</Link>
            </li>
          )
        }

        <li className="new">
          <Link to="/forms/new" activeClassName="active">New Form</Link>
        </li>
      </ul>
    )
  }
}

class AccountLinks extends React.Component<{}, {}> {
  render() {
    return (
      <ul>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    );
  }
}

interface AppHeaderProps {
  forms: { value: List<any>, ready: boolean };
}

export class AppHeader extends React.Component<AppHeaderProps, {}> {
  render() {
    return (
      <header className="app">
        <nav className="forms">
          <FormLinks {...this.props} />
        </nav>

        <nav className="account">
          <AccountLinks />
        </nav>
      </header>
    );
  }
}
