import { render, screen } from '@testing-library/react';
import React from 'react';

import Media from '../src/Media';

describe('Media', () => {
  it('uses "div" by default', () => {
    render(<Media />);

    assert.equal(document.querySelector('.media').nodeName, 'DIV');
  });

  it('has "media" class', () => {
    render(<Media />);

    assert.include(document.querySelector('.media').className, 'media');
  });

  it('should merge additional classes passed in', () => {
    render(<Media className="custom-class" />);

    assert.include(document.querySelector('.media').className, 'media');
    assert.include(document.querySelector('.media').className, 'custom-class');
  });

  it('should allow custom elements instead of "div"', () => {
    render(<Media componentClass="section" />);

    assert.equal(document.querySelector('.media').nodeName, 'SECTION');
  });

  it('should render children', () => {
    render(
      <Media>
        <strong>Children</strong>
      </Media>
    );
    assert.ok(screen.getByText('Children'));
  });
});
