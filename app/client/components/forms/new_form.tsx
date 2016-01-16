import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addForm } from '../../actions/forms';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../utils/validators';
import { EmailsInput, emailsValidator } from '../shared/emails_input';
import { FormAttrs } from '../../../../lib/models/form.ts';

const mapStateToProps = (state: any) => {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onNewForm: (form: FormAttrs) => {
      dispatch(addForm(form));
    }
  }
}

@reduxForm({
  form: 'form',
  fields: ['name', 'subscribers'],

  validate: combineValidators({
    name: [requiredValidator],
    subscribers: [emailsValidator],
  }),

  initialValues: {
    subscribers: [],
  },
})

@connect(mapStateToProps, mapDispatchToProps)
export class NewForm extends React.Component<any, any> {
  render() {
    const { fields: { name, subscribers }, onNewForm, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit((form: FormAttrs) => onNewForm(form))}>
        <div>
          <label>Form Name</label>
          <input type="text" placeholder="Name" {...name}/>
          {name.error && name.touched && <div className="error">{name.error}</div>}
        </div>

        <div>
          <label>Subscribers</label>
          <EmailsInput {...subscribers} />
          {subscribers.error && subscribers.touched && <div className="error">{subscribers.error}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}
