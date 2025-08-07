import { render, screen } from '@testing-library/react';
import React from 'react';

import Media from '../src/Media';

describe('Media.List', () => {
  it('uses "ul"', () => {
    render(<Media.List />);

    assert.equal(document.querySelector('.media-list').nodeName, 'UL');
  });
  it('has "media-list" class', () => {
    render(<Media.List />);

    assert.include(
      document.querySelector('.media-list').className,
      'media-list'
    );
  });
  it('should merge additional classes passed in', () => {
    render(<Media.List className="custom-class" />);
    const classes = document.querySelector('.media-list').className;

    assert.include(classes, 'media-list');
    assert.include(classes, 'custom-class');
  });
  it('should render children', () => {
    render(
      <Media.List>
        <strong>Content</strong>
      </Media.List>
    );
    assert.ok(screen.getByText('Content'));
  });
});
