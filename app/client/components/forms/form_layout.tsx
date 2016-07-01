import * as React from 'react';

import { Link } from 'react-router';
import { FormTabs } from './form_tabs';

import * as styles from './form_layout.css!';

export const FormLayout = ({ form, children = undefined }) => (
  <section className={styles.container}>
    <FormTabs form={form} />

    <section className={styles.scroller}>
      {React.Children.map(children, child => React.cloneElement(child as React.ReactElement<any>, { current: { form } }))}
    </section>
  </section>
);
