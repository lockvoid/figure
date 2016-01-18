import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateForm, removeFormAndRedirect } from '../../actions/forms';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../utils/validators';
import { FormAttrs } from '../../../../lib/models/form.ts';
import { findForm } from '../../reducers/forms';

const formConfig = {
  form: 'form',
  fields: ['name'],

  validate: combineValidators({
    name: [requiredValidator],
  })
}

const stateToProps = (state, props) => {
  let currentFormId = props.params.formId;
  let initialValues = findForm(state.forms, currentFormId);

  return { currentFormId, initialValues };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    onUpdate: (id: string, attrs: FormAttrs) => {
      dispatch(updateForm(id, attrs));
    },

    onRemove: (id: string) => {
      dispatch(removeFormAndRedirect(id));
    },
  }
}

@reduxForm(formConfig, stateToProps, dispatchToProps)
export class FormSettings extends React.Component<any, any> {
  render() {
    const { fields: { name }, currentFormId, onUpdate, onRemove, handleSubmit } = this.props;

    return (
      <div className="form settings">
        <form onSubmit={handleSubmit((attrs: FormAttrs) => onUpdate(currentFormId, attrs))}>
          <div>
            <label>Form Name</label>
            <input type="text" placeholder="Name" {...name}/>
            {name.error && name.touched && <div className="error">{name.error}</div>}
          </div>

          <button type="submit">Update</button>
          <button type="button" onClick={() => onRemove(currentFormId)}>Remove</button>
        </form>
      </div>
    );
  }
}
