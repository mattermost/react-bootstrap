import { render } from '@testing-library/react';
import React from 'react';

import Button from '../src/Button';
import FormControl from '../src/FormControl';
import InputGroup from '../src/InputGroup';

import { assertSingle } from './helpers';

describe('<InputGroup>', () => {
  it('should render properly', () => {
    const { container } = render(
      <InputGroup className="my-input-group">
        <InputGroup.Addon className="my-addon">Foo</InputGroup.Addon>

        <FormControl type="text" />

        <InputGroup.Button className="my-button">
          <Button>Bar</Button>
        </InputGroup.Button>
      </InputGroup>
    );
    const wrapper = assertSingle(container, '.input-group.my-input-group');

    assertSingle(
      wrapper,
      '.input-group-addon.my-addon'
    ).textContent.should.equal('Foo');

    assertSingle(wrapper, 'input.form-control[type="text"]');

    const button = assertSingle(wrapper, '.input-group-btn.my-button');
    assertSingle(button, '.btn');
  });

  it('should support bsSize', () => {
    const { container } = render(<InputGroup bsSize="small" />);
    assertSingle(container, '.input-group.input-group-sm');
  });
});
