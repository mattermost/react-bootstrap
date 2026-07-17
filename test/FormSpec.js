import { render } from '@testing-library/react';
import React from 'react';

import Form from '../src/Form';
import FormGroup from '../src/FormGroup';

import { assertSingle } from './helpers';

describe('<Form>', () => {
  it('should support horizontal', () => {
    const { container } = render(
      <Form horizontal className="my-form">
        <FormGroup />
      </Form>
    );

    const form = assertSingle(container, 'form.form-horizontal.my-form');
    assertSingle(form, '.form-group');
  });

  it('should support inline', () => {
    const { container } = render(
      <Form inline className="my-form">
        <FormGroup />
      </Form>
    );

    const form = assertSingle(container, 'form.form-inline.my-form');
    assertSingle(form, '.form-group');
  });

  it('should support custom componentClass', () => {
    const { container } = render(
      <Form componentClass="fieldset" horizontal className="my-form">
        <FormGroup />
      </Form>
    );

    const fieldset = assertSingle(
      container,
      'fieldset.form-horizontal.my-form'
    );
    assertSingle(fieldset, '.form-group');
  });
});
