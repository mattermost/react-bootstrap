import { render, screen } from '@testing-library/react';
import React from 'react';

import Media from '../src/Media';

describe('<Media.Body>', () => {
  it('uses "div" by default', () => {
    render(<Media.Body />);

    assert.equal(document.querySelector('.media-body').nodeName, 'DIV');
  });

  it('has "media-body" class', () => {
    render(<Media.Body />);

    assert.include(
      document.querySelector('.media-body').className,
      'media-body'
    );
  });

  it('should be able to change alignment to middle', () => {
    render(<Media.Body align="middle" />);

    assert.ok(
      document.querySelector('.media-body').className.match(/\bmedia-middle\b/)
    );
  });

  it('should be able to change alignment to bottom', () => {
    render(<Media.Body align="bottom" />);

    assert.ok(
      document.querySelector('.media-body').className.match(/\bmedia-bottom\b/)
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Media.Body className="custom-class" />);
    const classes = document.querySelector('.media-body').className;

    assert.include(classes, 'media-body');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "div"', () => {
    render(<Media.Body componentClass="section" />);

    assert.equal(document.querySelector('.media-body').nodeName, 'SECTION');
  });

  it('should render children', () => {
    render(
      <Media.Body>
        <strong>Content</strong>
      </Media.Body>
    );
    assert.ok(screen.getByText('Content'));
  });
});
