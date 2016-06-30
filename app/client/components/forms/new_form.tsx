import * as React from 'react';

import { Dispatch } from 'redux';
import { MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { reduxForm } from 'redux-form';
import { combineValidators, requiredValidator } from '../../utils/validators';
import { createForm } from '../../actions/index';
import { FieldBox, SubmitButton } from '../ui/forms/index';
import { Wrapper } from '../ui/wrapper';

const formConfig = {
  form: 'form',

  fields: [
    'name'
  ],

  validate: combineValidators({
    name: [
      requiredValidator
    ],
  }),
}

const mapStateToProps: MapStateToProps  = (state: any) => {
  return state;
}

const mapDispatchToProps: MapDispatchToPropsFunction = (dispatch: Dispatch) => {
  return {
    onSubmit: (payload) => new Promise((resolve, reject) => {
      dispatch(createForm(payload, resolve, reject))
    }),
  }
}

@reduxForm(formConfig, mapStateToProps, mapDispatchToProps)

export class NewForm extends React.Component<any, any> {
  render() {
    const { fields: { name }, handleSubmit, submitting, error } = this.props;

    return (
      <div className="forms new">
        <header className="default">
          <h1>Create a new form</h1>
        </header>

        <Wrapper direction="column">
          <form className="default" onSubmit={createForm}>
            {error && !submitting && <div className="alert danger">{error}</div>}

            <FieldBox {...name}>
              <div className="title">Form Name</div>
              <input type="text" {...name} />
              <div className="hint">Now just enter a name. Setup the form later.</div>
            </FieldBox>

            <div className="buttons">
              <SubmitButton title="Continue" submitting={submitting} />
            </div>
          </form>
        </Wrapper>
      </div>
    );
  }
}
