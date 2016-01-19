import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator, emailValidator } from '../../utils/validators';
import { UserAttrs } from '../../../../lib/models/user.ts';
import { updateUser } from '../../actions/auth';

const userFormConfig = {
  form: 'user',

  fields: ['email'],

  validate: combineValidators({
    email: [requiredValidator, emailValidator],
  })
}

const stateToProps = (state) => {
  return { initialValues: state.auth.user };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    onUpdate: (attrs: UserAttrs) => {
      dispatch(updateUser(attrs));
    },
  }
}

@reduxForm(userFormConfig, stateToProps, dispatchToProps)
export class EditAccount extends React.Component<any, {}> {
  render() {
    let { fields: { email }, handleSubmit, onUpdate } = this.props;

    return (
      <div className="account edit">
        <form onSubmit={handleSubmit((attrs: UserAttrs) => onUpdate(attrs))}>
          <div>
            <label>Your email</label>
            <input type="text" placeholder="Email" {...email}/>
            {email.error && email.touched && <div className="error">{email.error}</div>}
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}
