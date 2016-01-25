import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator, emailValidator } from '../../utils/validators';
import { UserAttrs } from '../../../../lib/models/user.ts';
import { updateUser, resetApiKey } from '../../actions/auth';
import { FieldBox } from '../shared/field_box';

const userFormConfig = {
  form: 'user',

  fields: ['email'],

  validate: combineValidators({
    email: [requiredValidator, emailValidator],
  })
}

const stateToProps = (state) => {
  return { initialValues: state.auth.user, user: state.auth.user };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    onUpdate: (attrs: UserAttrs) => {
      dispatch(updateUser(attrs));
    },

    onResetApiKey: () => {
      if (window.confirm("Do you really want to reset the API key?")) {
        dispatch(resetApiKey());
      }
    }
  }
}

@reduxForm(userFormConfig, stateToProps, dispatchToProps)
export class EditAccount extends React.Component<any, {}> {
  render() {
    let { user, fields: { email }, handleSubmit, onUpdate, onResetApiKey } = this.props;

    return (
      <div className="account edit">
        <header className="main">
          <h1>Manage your account</h1>
        </header>

        <form className="classic email" onSubmit={handleSubmit((attrs: UserAttrs) => onUpdate(attrs))}>
          <FieldBox {...email}>
            <label>Your Email</label>
            <input type="text" placeholder="Email" {...email}/>
          </FieldBox>


          <div className="buttons">
            <button type="submit">Update</button>
          </div>
        </form>

        <div className="api">
          <h1>API Key</h1>
          <div className="secret">
            <span>{user.apiKey}</span>
            <button type="button" className="reset generate" title="Regenerate API Key" onClick={onResetApiKey.bind(this)}>Reset Key</button>
          </div>
        </div>
      </div>
    );
  }
}
