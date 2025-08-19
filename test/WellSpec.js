import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';

import Well from '../src/Well';

describe('Well', () => {
  it('Should output a well with content', () => {
    render(
      <Well>
        <strong>Content</strong>
      </Well>
    );
    assert.ok(screen.getByText('Content'));
  });

  it('Should have a well class', () => {
    render(<Well>Content</Well>);
    assert.ok(document.querySelector('.well').className.match(/\bwell\b/));
  });

  it('Should accept bsSize arguments', () => {
    render(<Well bsSize="small">Content</Well>);
    assert.ok(document.querySelector('.well').className.match(/\bwell-sm\b/));
  });
});
