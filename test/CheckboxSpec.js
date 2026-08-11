import { render } from '@testing-library/react';
import React from 'react';

import Checkbox from '../src/Checkbox';

import { assertNone, assertSingle, shouldWarn } from './helpers';

describe('<Checkbox>', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Checkbox name="foo" checked readOnly className="my-checkbox">
        My label
      </Checkbox>
    );

    const div = assertSingle(container, 'div.checkbox.my-checkbox');
    const input = assertSingle(div, 'input[type="checkbox"][name="foo"]');
    expect(input.checked).to.equal(true);

    assertSingle(container, 'label').textContent.should.equal('My label');
  });

  it('should support inline', () => {
    const { container } = render(
      <Checkbox inline name="foo" className="my-checkbox">
        My label
      </Checkbox>
    );

    const label = assertSingle(container, 'label.checkbox-inline.my-checkbox');
    assertSingle(label, 'input[type="checkbox"][name="foo"]');

    assertSingle(container, 'label').textContent.should.equal('My label');
  });

  it('should support validation state', () => {
    const { container } = render(<Checkbox validationState="success" />);
    assertSingle(container, '.has-success');
  });

  it('should not support validation state when inline', () => {
    shouldWarn('ignored');

    const { container } = render(<Checkbox inline validationState="success" />);
    assertNone(container, '.has-success');
  });

  it('should support inputRef', () => {
    let input;
    render(
      <Checkbox
        inputRef={ref => {
          input = ref;
        }}
      />
    );

    expect(input.tagName).to.equal('INPUT');
  });
});
