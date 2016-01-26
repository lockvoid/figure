import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FORM_INITIAL_VALUES, updateForm, removeFormAndRedirect } from '../../actions/forms';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../utils/validators';
import { FormAttrs } from '../../../../lib/models/form.ts';
import { findForm } from '../../reducers/forms';
import { FieldBox } from '../shared/field_box';
import { CheckboxField } from '../shared/checkbox_field';

const formConfig = {
  form: 'form',
  fields: ['name', 'redirectTo', 'notifyMe'],

  validate: combineValidators({
    name: [requiredValidator],
  }),
}

const stateToProps = (state, props) => {
  let currentFormId = props.params.formId;
  let initialValues = Object.assign({}, FORM_INITIAL_VALUES, findForm(state.forms, currentFormId));

  return { currentFormId, initialValues };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    onUpdate: (id: string, attrs: FormAttrs) => {
      dispatch(updateForm(id, attrs));
    },

    onRemove: (id: string) => {
      if (window.confirm("Do you really want to delete?")) {
        dispatch(removeFormAndRedirect(id));
      }
    },
  }
}

@reduxForm(formConfig, stateToProps, dispatchToProps)
export class EditForm extends React.Component<any, any> {
  context: any;

  static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(route) {
    if (this.props.dirty && !window.confirm("You have unsaved changed. Do you really want to leave?")) {
      return false;
    }
  }

  render() {
    const { fields: { name, redirectTo, notifyMe }, currentFormId, onUpdate, onRemove, handleSubmit } = this.props;

    return (
      <div className="form edit">
        <h1>Edit Form</h1>

        <form className="classic" onSubmit={handleSubmit((attrs: FormAttrs) => onUpdate(currentFormId, attrs))}>
          <FieldBox {...name}>
            <label>Form Name</label>
            <input type="text" {...name} />
          </FieldBox>

          <FieldBox {...redirectTo}>
            <label>Redirect Url</label>
            <input type="text" placeholder="http://example.com/thankyou" {...redirectTo} />
          </FieldBox>

          <FieldBox {...notifyMe}>
            <CheckboxField {...notifyMe}>Notify me?</CheckboxField>
            <div className="hint">Send email notifications on a new submission</div>
          </FieldBox>

          <div className="buttons">
            <button type="submit">Update Form</button>
            <button type="button" className="delete" onClick={() => onRemove(currentFormId)}>Remove</button>
          </div>
       </form>
      </div>
    );
  }
}
