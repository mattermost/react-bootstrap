import { render } from '@testing-library/react';
import React from 'react';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

import { assertNone, assertSingle, shouldWarn } from './helpers';

describe('<FormControl>', () => {
  it('should render correctly', () => {
    const { container } = render(
      <FormControl type="text" id="foo" name="bar" className="my-control" />
    );
    assertSingle(container, 'input#foo.form-control.my-control[name="bar"]');
  });

  it('should support textarea', () => {
    const { container } = render(<FormControl componentClass="textarea" />);
    assertSingle(container, 'textarea.form-control');
  });

  it('should support select', () => {
    const { container } = render(<FormControl componentClass="select" />);
    assertSingle(container, 'select.form-control');
  });

  it('should not render .form-control for type="file"', () => {
    const { container } = render(<FormControl type="file" />);
    assertSingle(container, 'input[type="file"]');
    assertNone(container, '.form-control');
  });

  it('should use controlId for id', () => {
    const { container } = render(
      <FormGroup controlId="foo">
        <FormControl type="text" />
      </FormGroup>
    );
    assertSingle(container, 'input#foo.form-control');
  });

  it('should prefer explicit id', () => {
    shouldWarn('ignored');

    const { container } = render(
      <FormGroup controlId="foo">
        <FormControl type="text" id="bar" />
      </FormGroup>
    );
    assertSingle(container, 'input#bar.form-control');
  });

  it('should support inputRef', () => {
    let input;
    render(
      <FormGroup controlId="foo">
        <FormControl
          type="text"
          inputRef={ref => {
            input = ref;
          }}
        />
      </FormGroup>
    );
    expect(input.tagName).to.equal('INPUT');
  });

  it('should properly display size of FormControl', () => {
    const { container } = render(<FormControl type="text" bsSize="lg" />);
    assertSingle(container, 'input.form-control.input-lg');
  });
});
