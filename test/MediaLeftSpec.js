import { render, screen } from '@testing-library/react';
import React from 'react';

import Media from '../src/Media';

describe('Media.Left', () => {
  it('uses "div"', () => {
    render(<Media.Left />);

    assert.equal(document.querySelector('.media-left').nodeName, 'DIV');
  });

  it('has "media-left" class', () => {
    render(<Media.Left />);

    assert.ok(
      document.querySelector('.media-left').className.match(/\bmedia-left\b/)
    );
  });

  it('should be able to change alignment to middle', () => {
    render(<Media.Left align="middle" />);

    assert.ok(
      document.querySelector('.media-left').className.match(/\bmedia-middle\b/)
    );
  });

  it('should be able to change alignment to bottom', () => {
    render(<Media.Left align="bottom" />);

    assert.ok(
      document.querySelector('.media-left').className.match(/\bmedia-bottom\b/)
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Media.Left className="custom-class" />);

    assert.include(
      document.querySelector('.media-left').className,
      'media-left'
    );
    assert.include(
      document.querySelector('.media-left').className,
      'custom-class'
    );
  });

  it('should render children', () => {
    render(
      <Media.Left>
        <img />
      </Media.Left>
    );
    assert.ok(screen.getByRole('img'));
  });
});
