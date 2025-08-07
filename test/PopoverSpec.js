import { render, screen } from '@testing-library/react';
import React from 'react';

import Popover from '../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    render(
      <Popover id="test-popover" title="Popover title">
        <strong>Popover Content</strong>
      </Popover>
    );

    assert.ok(screen.getByText('Popover title'));
    assert.ok(screen.getByText('Popover Content'));

    assert.equal(screen.getByRole('tooltip').style.display, 'block');
  });
});
