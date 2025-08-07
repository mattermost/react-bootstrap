import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';

import Button from '../src/Button';
import ButtonGroup from '../src/ButtonGroup';
import ButtonToolbar from '../src/ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    render(
      <ButtonToolbar>
        <ButtonGroup>
          <Button>Title</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
    let node = screen.getByRole('toolbar');
    assert.equal(node.nodeName, 'DIV');
    assert.ok(node.className.match(/\bbtn-toolbar\b/));
    assert.equal(node.getAttribute('role'), 'toolbar');
  });
});
