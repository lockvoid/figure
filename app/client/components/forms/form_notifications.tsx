import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateForm, removeFormAndRedirect } from '../../actions/forms';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../utils/validators';
import { FormAttrs } from '../../../../lib/models/form.ts';
import { findForm } from '../../reducers/forms';
import { FieldBox } from '../shared/field_box';
import { CheckboxField } from '../shared/checkbox_field';
import { formInitialValues } from './form_initial_values';

const formConfig = {
  form: 'form',
  fields: ['notifyMe', 'notifications'],
}

const stateToProps = (state, props) => {
  let currentFormId = props.params.formId;
  let initialValues = Object.assign({}, formInitialValues, findForm(state.forms, currentFormId));

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
export class FormNotifications extends React.Component<any, any> {
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
    const { fields: { notifyMe, notifications }, currentFormId, onUpdate, onRemove, handleSubmit } = this.props;

    return (
      <div className="form edit">
        <h1>Notifications Center</h1>

        <form className="classic" onSubmit={handleSubmit((attrs: FormAttrs) => onUpdate(currentFormId, attrs))}>
          <FieldBox {...notifyMe}>
            <CheckboxField {...notifyMe}>Notify me?</CheckboxField>
            <div className="hint">Send email notifications on a new submission</div>
          </FieldBox>

          <FieldBox {...notifications}>
            <label>Additional email addresses</label>
            <input type="text" placeholder="email@gmail.com, email@hotmail.com, etc..." {...notifications} />
            <div className="hint">Use comma to set multiple email addresses</div>
          </FieldBox>

          <div className="buttons">
            <button type="submit">Update Notifications</button>
          </div>
       </form>
      </div>
    );
  }
}
