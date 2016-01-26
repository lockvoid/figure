import * as React from 'react';
import { Dispatch } from 'redux';
import { routeActions } from 'redux-simple-router';
import { connect } from 'react-redux';
import { removeFormAndRedirect } from '../../actions/forms';
import { findForm } from '../../reducers/forms';
import { Link } from 'react-router';

interface FormDashboardProps {
  formId: string;
}

class FormDashboard extends React.Component<FormDashboardProps, {}> {
  pathTo(path: string) {
    return `forms/${this.props.formId}/${path}`;
  }

  render() {
    let { formId } = this.props;

    return (
      <nav className="dashboard">
        <ul>
          <li>
            <Link to={this.pathTo('submissions')} activeClassName="active">Submissions</Link>
          </li>
          <li>
            <Link to={this.pathTo('setup')} activeClassName="active">Setup</Link>
          </li>
          <li>
            <Link to={this.pathTo('edit')} activeClassName="active">Edit</Link>
          </li>
          <li>
            <Link to={this.pathTo('plugins')} activeClassName="active">Plugins</Link>
          </li>

          <li>
            <Link to={this.pathTo('webhooks')} activeClassName="active">Webhooks</Link>
          </li>
          <li>
            <Link to={this.pathTo('reducers')} activeClassName="active">Reducers</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const stateToProps = (state, props) => {
  return { currentForm: findForm(state.forms, props.params.formId) };
}

@connect(stateToProps)
export class ShowForm extends React.Component<any, any> {
  render() {
    const { params, currentForm, children } = this.props;

    return (
      <div className="form show">
        <FormDashboard formId={currentForm.$key} />
        {children}
      </div>
    );
  }
}
