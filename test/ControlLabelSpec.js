import { render } from '@testing-library/react';
import React from 'react';

import ControlLabel from '../src/ControlLabel';
import FormGroup from '../src/FormGroup';

import { assertSingle, shouldWarn } from './helpers';

describe('<ControlLabel>', () => {
  it('should render correctly', () => {
    const { container } = render(
      <ControlLabel htmlFor="foo" className="my-control-label">
        Label
      </ControlLabel>
    );

    expect(
      assertSingle(container, 'label.control-label.my-control-label[for="foo"]')
        .textContent
    ).to.equal('Label');
  });

  it('should respect srOnly', () => {
    const { container } = render(<ControlLabel srOnly>Label</ControlLabel>);
    assertSingle(container, 'label.control-label.sr-only');
  });

  it('should use controlId for htmlFor', () => {
    const { container } = render(
      <FormGroup controlId="foo">
        <ControlLabel>Label</ControlLabel>
      </FormGroup>
    );
    assertSingle(container, 'label.control-label[for="foo"]');
  });

  it('should prefer explicit htmlFor', () => {
    shouldWarn('ignored');

    const { container } = render(
      <FormGroup controlId="foo">
        <ControlLabel htmlFor="bar">Label</ControlLabel>
      </FormGroup>
    );
    assertSingle(container, 'label.control-label[for="bar"]');
  });
});
