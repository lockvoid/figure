import * as React from 'react';

import { Dispatch } from 'redux';
import { connect, MapStateToProps } from 'react-redux';

const mapStateToProps: MapStateToProps = ({ forms }, { params }) => {
  return { form: forms.rows.find(form => form.id === params.formId) };
}

@connect(mapStateToProps)
export class SetupForm extends React.Component<any, any> {
  render() {
    let { form } = this.props;

    return (
      <div className="forms setup">
        <wrapper>
          <section className="next">
            <h2>Don't have a form yet?</h2>
            <p>In the form below Figure will collect a user's email address. Copy and paste this one to your site to get started: You can add whatever inputs you like, but the <code>action</code> attribute should be set to Figure endpoint like in example above and below. Figure uses the <code>name</code> attribute to recognize and categorize a form data. In example below Figure will collect a user's name and message.</p>

            <pre>
              {
                `<form action="https://figure-app.com/f/${form.key}" method="post">
                  <input type="hidden" name="utf8" value="✓">
                <input type="text" name="name" placeholder="Enter your name...">
                <input type="email" name="email" placeholder="Enter your email...">
                <button type="submit">Submit</button>
              </form>`
              }
            </pre>
          </section>

          <section className="next">
            <h2>Have a form?</h2>
            <p>If you already have a form, just change it <code>action</code> attribute to <code>{`https://figure-app.com/${form.key}`}</code> and Figure will start collect data.</p>
          </section>

          <section className="next">
            <h2>Ready?</h2>
            <p>Once you have done a one of the steps below, just submit a form and data will appear in the submissions section.</p>
          </section>
        </wrapper>
      </div>
    );
  }
}
