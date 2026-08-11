import { render } from '@testing-library/react';
import React from 'react';

import FormControl from '../src/FormControl';

import { assertSingle } from './helpers';

describe('<FormControl.Static>', () => {
  it('should render correctly', () => {
    const { container } = render(
      <FormControl.Static name="foo" className="my-form-control-static">
        Static text
      </FormControl.Static>
    );

    expect(
      assertSingle(container, '.form-control-static.my-form-control-static')
        .textContent
    ).to.equal('Static text');
  });

  it('should support custom componentClass', () => {
    function MyComponent({ children, ...props }) {
      return <div {...props}>{children}</div>;
    }

    const { container } = render(
      <FormControl.Static componentClass={MyComponent}>
        Static text
      </FormControl.Static>
    );

    const node = assertSingle(container, '.form-control-static');
    assert.equal(node.nodeName, 'DIV');
    expect(node.textContent).to.contain('Static text');
  });
});
