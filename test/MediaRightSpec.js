import { render, screen } from '@testing-library/react';
import React from 'react';

import Media from '../src/Media';

describe('Media.Right', () => {
  it('uses "div"', () => {
    render(<Media.Right />);

    assert.equal(document.querySelector('.media-right').nodeName, 'DIV');
  });

  it('has "media-right" class', () => {
    render(<Media.Right />);

    assert.ok(
      document.querySelector('.media-right').className.match(/\bmedia-right\b/)
    );
  });

  it('should be able to change alignment to middle', () => {
    render(<Media.Right align="middle" />);

    assert.ok(
      document.querySelector('.media-right').className.match(/\bmedia-middle\b/)
    );
  });

  it('should be able to change alignment to bottom', () => {
    render(<Media.Right align="bottom" />);

    assert.ok(
      document.querySelector('.media-right').className.match(/\bmedia-bottom\b/)
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Media.Right className="custom-class" />);

    assert.include(
      document.querySelector('.media-right').className,
      'media-right'
    );
    assert.include(
      document.querySelector('.media-right').className,
      'custom-class'
    );
  });

  it('should render children', () => {
    render(
      <Media.Right>
        <img />
      </Media.Right>
    );
    assert.ok(screen.getByRole('img'));
  });
});
