import * as React from 'react';

import { Link } from 'react-router';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { Wrapper } from '../components/ui/wrapper';
import { FormTabsNavigation } from '../components/forms/form_tabs_navigation';
import { NotFound } from '../components/pages/not_found';

const mapStateToProps: MapStateToProps = ({ forms }, { params }) => {
  return { form: forms.rows.find(form => form.id === params.formId) };
}

@connect(mapStateToProps)
export class Form extends React.Component<any, any> {
  render() {
    const { form, children } = this.props;

    if (!form) {
      return <NotFound message="Perhaps head back to the form list?" />;
    }

    return (
      <Wrapper direction="column">
        <FormTabsNavigation form={form} />
        {React.Children.map(children, child => React.cloneElement(child as React.ReactElement<any>, { current: { form } }))}
      </Wrapper>
    );
  }
}
