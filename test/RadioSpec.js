import { render } from '@testing-library/react';
import React from 'react';

import Radio from '../src/Radio';

import { assertNone, assertSingle, shouldWarn } from './helpers';

describe('<Radio>', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Radio name="foo" checked readOnly className="my-radio">
        My label
      </Radio>
    );

    const div = assertSingle(container, 'div.radio.my-radio');
    const input = assertSingle(div, 'input[type="radio"][name="foo"]');
    expect(input.checked).to.equal(true);

    assertSingle(container, 'label').textContent.should.equal('My label');
  });

  it('should support inline', () => {
    const { container } = render(
      <Radio inline name="foo" className="my-radio">
        My label
      </Radio>
    );

    const label = assertSingle(container, 'label.radio-inline.my-radio');
    assertSingle(label, 'input[type="radio"][name="foo"]');

    assertSingle(container, 'label').textContent.should.equal('My label');
  });

  it('should support validation state', () => {
    const { container } = render(<Radio validationState="success" />);
    assertSingle(container, '.has-success');
  });

  it('should not support validation state when inline', () => {
    shouldWarn('ignored');

    const { container } = render(<Radio inline validationState="success" />);
    assertNone(container, '.has-success');
  });

  it('should support inputRef', () => {
    let input;
    render(
      <Radio
        inputRef={ref => {
          input = ref;
        }}
      />
    );

    expect(input.tagName).to.equal('INPUT');
  });
});
