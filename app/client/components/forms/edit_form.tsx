import * as React from 'react';

import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../utils/validators';
import { updateForm, deleteForm } from '../../actions/index';
import { FieldBox } from '../shared/fieldbox';
import { NotFound } from '../shared/not_found';
import { SubmitButton } from '../shared/submit_button';
import { Checkbox } from '../shared/checkbox';

const formConfig = {
  form: 'form',

  fields: [
    'name', 'redirect_to', 'notify_me'
  ],

  validate: combineValidators({
    name: [
      requiredValidator
    ],
  }),
}

const mapStateToProps: MapStateToProps = ({ auth: { api }, forms }, { params }) => {
  const form = forms.rows.find(form => form.id === params.formId);

  return { api, initialValues: form };
}

const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch, { params }) => {
  return {
    onSubmit: (payload) => new Promise((resolve, reject) => {
      dispatch(updateForm(params.formId, payload, resolve, reject))
    }),

    onDelete: () => {
      if (window.confirm("Do you really want to delete?")) {
        dispatch(deleteForm(params.formId));
      }
    },
  }
}

@reduxForm(formConfig, mapStateToProps, mapDispatchToProps)
export class EditForm extends React.Component<any, any> {
  render() {
    const { fields: { name, redirect_to, notify_me }, handleSubmit, onDelete, submitting, error } = this.props;

    return (
      <div className="forms edit">
        <wrapper>
          <form className="default" onSubmit={handleSubmit}>
            {error && !submitting && <div className="alert failure">{error}</div>}

            <FieldBox {...name}>
              <div className="title">Form Name</div>
              <input type="text" {...name} />
            </FieldBox>

            <FieldBox {...redirect_to}>
              <div className="title">Redirect Url</div>
              <input type="text" {...redirect_to} placeholder="https://figure-app.com/thankyou" />
            </FieldBox>

            <FieldBox {...notify_me}>
              <Checkbox {...notify_me}>Notify Me?</Checkbox>
              <div className="hint">Send a notification on a new submission.</div>
            </FieldBox>

            <div className="buttons">
              <SubmitButton title="Update" submitting={submitting} />
              <button type="button" className="flat danger end" onClick={onDelete}>Delete</button>
            </div>
          </form>
        </wrapper>
      </div>
    );
  }
}
