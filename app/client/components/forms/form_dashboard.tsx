import * as React from 'react';

import { Link } from 'react-router';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { NotFound } from '../shared/not_found';

const mapStateToProps: MapStateToProps = ({ forms }, { params }) => {
  return { form: forms.rows.find(form => form.id === params.formId) };
}

@connect(mapStateToProps)
export class FormDashboard extends React.Component<any, any> {
  render() {
    const { form, children } = this.props;

    if (!form) {
      return <NotFound message="Perhaps head back to the form list?" />;
    }

    return (
      <div className="forms dashboard">
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
              <div className="feature">Export</div>
            </li>
            <li>
              <div className="feature">Webhooks</div>
            </li>
            <li>
              <div className="feature">Reducers</div>
            </li>
          </ul>
        </nav>

        {children}
      </div>
    );
  }

  pathTo(path: string) {
    return `forms/${this.props.form.id}/${path}`;
  }
}
