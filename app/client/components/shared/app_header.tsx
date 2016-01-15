import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router';
import { bindForms } from '../../actions/forms';

const mapStateToProps = (state: any) => {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    mountForms: () => {
      dispatch(bindForms());
    },
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class AppHeader extends React.Component<any, any> {
  constructor({ mountForms }) {
    super();
    mountForms();
  }

  render() {
    let { forms } = this.props;

    let formsList = forms.map((form: any) =>
      <li key={form.$key}>
        <Link to={`/forms/${form.$key}`} activeClassName="active">{form.name}</Link>
      </li>
    );

    return (
      <header className="app">
        <nav className="forms">
          <ul>
            {formsList}
          </ul>
        </nav>
      </header>
    );
  }
}
