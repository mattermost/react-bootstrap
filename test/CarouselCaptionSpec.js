import { render, screen } from '@testing-library/react';
import React from 'react';

import Carousel from '../src/Carousel';

describe('<Carousel.Caption>', () => {
  it('uses "div" by default', () => {
    render(<Carousel.Caption>Carousel.Caption content</Carousel.Caption>);

    assert.equal(screen.getByText('Carousel.Caption content').nodeName, 'DIV');
  });

  it('has "carousel-caption" class', () => {
    render(<Carousel.Caption>Carousel.Caption content</Carousel.Caption>);
    assert.equal(
      screen.getByText('Carousel.Caption content').className,
      'carousel-caption'
    );
  });

  it('Should merge additional classes passed in', () => {
    render(
      <Carousel.Caption className="bob">
        Carousel.Caption content
      </Carousel.Caption>
    );
    assert.ok(
      screen.getByText('Carousel.Caption content').className.match(/\bbob\b/)
    );
    assert.ok(
      screen
        .getByText('Carousel.Caption content')
        .className.match(/\bcarousel-caption\b/)
    );
  });

  it('allows custom elements instead of "div"', () => {
    render(
      <Carousel.Caption componentClass="section">
        Carousel.Caption content
      </Carousel.Caption>
    );

    assert.equal(
      screen.getByText('Carousel.Caption content').nodeName,
      'SECTION'
    );
  });
});
