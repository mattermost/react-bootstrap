import { render, screen } from '@testing-library/react';
import React from 'react';

import Media from '../src/Media';

describe('Media.Heading', () => {
  it('uses "h4" by default', () => {
    render(<Media.Heading />);

    assert.equal(document.querySelector('.media-heading').nodeName, 'H4');
  });

  it('has "media-heading" class', () => {
    render(<Media.Heading />);

    assert.include(
      document.querySelector('.media-heading').className,
      'media-heading'
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Media.Heading className="custom-class" />);

    assert.include(
      document.querySelector('.media-heading').className,
      'media-heading'
    );
    assert.include(
      document.querySelector('.media-heading').className,
      'custom-class'
    );
  });

  it('should allow custom elements instead of "h4"', () => {
    render(<Media.Heading componentClass="h2" />);

    assert.equal(document.querySelector('.media-heading').nodeName, 'H2');
  });

  it('should render children', () => {
    render(
      <Media.Heading>
        <strong>Children</strong>
      </Media.Heading>
    );
    assert.ok(screen.getByText('Children'));
  });
});
