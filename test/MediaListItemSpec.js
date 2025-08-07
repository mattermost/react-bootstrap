import { render, screen } from '@testing-library/react';
import React from 'react';

import Media from '../src/Media';

describe('Media.ListItem', () => {
  it('uses "li"', () => {
    render(<Media.ListItem />);

    assert.equal(document.querySelector('.media').nodeName, 'LI');
  });
  it('has "media" class', () => {
    render(<Media.ListItem />);

    assert.include(document.querySelector('.media').className, 'media');
  });
  it('should merge additional classes passed in', () => {
    render(<Media.ListItem className="custom-class" />);
    const classes = document.querySelector('.media').className;

    assert.include(classes, 'media');
    assert.include(classes, 'custom-class');
  });
  it('should render children', () => {
    render(
      <Media.ListItem>
        <strong>Content</strong>
      </Media.ListItem>
    );
    assert.ok(screen.getByText('Content'));
  });
});
