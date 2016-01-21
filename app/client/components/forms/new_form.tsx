import * as React from 'react';
import { Dispatch } from 'redux';
import { addForm } from '../../actions/forms';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../utils/validators';
import { FormAttrs } from '../../../../lib/models/form.ts';
import { FieldBox } from '../shared/field_box';
import { formInitialValues } from './form_initial_values';

const formConfig = {
  form: 'form',
  fields: ['name'],

  validate: combineValidators({
    name: [requiredValidator],
  }),

  initialValues: formInitialValues,
}

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

@reduxForm(formConfig, mapStateToProps, mapDispatchToProps)
export class NewForm extends React.Component<any, any> {
  render() {
    const { fields: { name }, onNewForm, handleSubmit } = this.props;

    return (
      <div className="form new">
        <header className="main">
          <h1>Create a new form</h1>
          <h3>You can configure it later, now just enter the name.</h3>
        </header>

        <form className="classic" onSubmit={handleSubmit((form: FormAttrs) => onNewForm(form))}>
          <FieldBox {...name}>
            <label>Form Name</label>
            <input type="text" {...name} autoFocus={true} />
          </FieldBox>

          <div className="buttons">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    );
  }
}
