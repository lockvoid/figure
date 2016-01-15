import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addForm } from '../../actions/forms';
import { reduxForm } from 'redux-form';
import { createValidator, required, emails } from '../../utils/validators';

const mapStateToProps = (state: any) => {
//  return Object.assign(state, { initialValues: { subscribers: 'sd' } });
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onNewForm: (data: any) => {
      dispatch(addForm(data));
    }
  }
}

@reduxForm({
  form: 'form',
  fields: ['name', 'subscribers'],

  validate: createValidator({
    name: [required],
    subscribers: [emails],
  }),

  initialValues: {
    subscribers: '',
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export class NewForm extends React.Component<any, any> {
  render() {
    const { fields: { name, subscribers }, onNewForm, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit((data: any) => onNewForm(data))}>
        <div>
          <label>Form Name</label>
          <input type="text" placeholder="Name" {...name}/>
          {name.error && name.touched && <div className="error">{name.error}</div>}
        </div>

        <div>
          <label>Subscribers</label>
          <input type="text" placeholder="Subscribers" {...subscribers}/>
          {subscribers.error && subscribers.touched && <div className="error">{subscribers.error}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}
