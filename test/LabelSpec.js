import { render, screen } from '@testing-library/react';
import React from 'react';

import Label from '../src/Label';

describe('Label', () => {
  it('Should output a label with message', () => {
    render(
      <Label>
        <strong>Message</strong>
      </Label>
    );
    assert.ok(screen.getByText('Message'));
  });

  it('Should have bsClass by default', () => {
    render(<Label>Message</Label>);
    assert.ok(screen.getByText('Message').className.match(/\blabel\b/));
  });

  it('Should have bsStyle by default', () => {
    render(<Label>Message</Label>);
    assert.ok(screen.getByText('Message').className.match(/\blabel-default\b/));
  });

  it('Hides when empty', () => {
    render(<Label />);
    assert.ok(document.querySelector('.label').className.match(/\bhidden\b/));
  });
});
