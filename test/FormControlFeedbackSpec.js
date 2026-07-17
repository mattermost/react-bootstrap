import { render } from '@testing-library/react';
import React from 'react';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

import { assertSingle } from './helpers';

describe('<FormControl.Feedback>', () => {
  it('should render default success', () => {
    const { container } = render(
      <FormGroup validationState="success">
        <FormControl.Feedback />
      </FormGroup>
    );
    assertSingle(container, '.form-control-feedback.glyphicon-ok');
  });

  it('should render default warning', () => {
    const { container } = render(
      <FormGroup validationState="warning">
        <FormControl.Feedback />
      </FormGroup>
    );
    assertSingle(container, '.form-control-feedback.glyphicon-warning-sign');
  });

  it('should render default error', () => {
    const { container } = render(
      <FormGroup validationState="error">
        <FormControl.Feedback />
      </FormGroup>
    );
    assertSingle(container, '.form-control-feedback.glyphicon-remove');
  });

  it('should render default validation state', () => {
    const { container } = render(
      <FormGroup validationState="success">
        <div>
          <FormControl.Feedback />
        </div>
      </FormGroup>
    );
    assertSingle(container, '.form-control-feedback.glyphicon-ok');
  });

  it('should render custom component', () => {
    function MyComponent(props) {
      return <div {...props} />;
    }

    const { container } = render(
      <FormControl.Feedback>
        <MyComponent className="foo" />
      </FormControl.Feedback>
    );
    assertSingle(container, '.foo.form-control-feedback');
  });
});
