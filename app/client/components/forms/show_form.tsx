import * as React from 'react';
import { Dispatch } from 'redux';
import { routeActions } from 'redux-simple-router';
import { connect } from 'react-redux';
import { removeFormAndRedirect } from '../../actions/forms';
import { AppSpinner } from '../../components/shared/app_spinner';
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
            <Link to={this.pathTo('settings')} activeClassName="active">Settings</Link>
          </li>
          <li>
            <Link to={this.pathTo('notifications')} activeClassName="active">Notifications</Link>
          </li>
          <li>
            <Link to={this.pathTo('webhooks')} activeClassName="active">Webhooks</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const stateToProps = (state, props) => {
  return { currentForm: state.forms.find(form => form.$key === props.params.formId) };
}

@connect(stateToProps)
export class ShowForm extends React.Component<any, any> {
  render() {
    const { params, currentForm, children } = this.props;

    if (!currentForm) {
      return <AppSpinner />;
    }

    return (
      <div className="form show">
        <FormDashboard formId={currentForm.$key} />
        {children}
      </div>
    );
  }
}
