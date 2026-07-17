import { render } from '@testing-library/react';
import React from 'react';

import HelpBlock from '../src/HelpBlock';

import { assertSingle } from './helpers';

describe('<HelpBlock>', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HelpBlock id="foo" className="my-help-block">
        Help contents
      </HelpBlock>
    );

    expect(
      assertSingle(container, '#foo.help-block.my-help-block').textContent
    ).to.equal('Help contents');
  });
});
