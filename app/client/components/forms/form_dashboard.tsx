 import * as React from 'react';

import { Link } from 'react-router';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { NotFound } from '../shared/not_found';

interface FormHeaderProps {
  formId: string;
}

class FormHeader extends React.Component<FormHeaderProps, {}> {
  pathTo(path: string) {
    return `forms/${this.props.formId}/${path}`;
  }

  render() {
    let { formId } = this.props;

    return (
      <nav>
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
            <Link to={this.pathTo('webhooks')} activeClassName="active">Webhooks</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps: MapStateToProps = ({ forms }, { params }) => {
  const form = forms.rows.find(form => form.id === params.formId);

  return { form };
}

@connect(mapStateToProps)
export class FormDashboard extends React.Component<any, any> {
  render() {
    const { form, children } = this.props;

    if (!form) {
      return <NotFound />;
    }

    return (
      <div className="forms dashboard">
        <FormHeader formId={form.id} />
        {children}
      </div>
    );
  }
}
