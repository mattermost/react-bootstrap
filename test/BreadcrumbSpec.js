import { render } from '@testing-library/react';
import React from 'react';

import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb>', () => {
  it('Should apply id to the wrapper ol element', () => {
    render(<Breadcrumb id="custom-id" />);

    let olNode = document.querySelector('ol');
    assert.equal(olNode.id, 'custom-id');
  });

  it('Should have breadcrumb class', () => {
    render(<Breadcrumb />);

    let olNode = document.querySelector('ol');
    assert.include(olNode.className, 'breadcrumb');
  });

  it('Should have custom classes', () => {
    render(<Breadcrumb className="custom-one custom-two" />);

    let olNode = document.querySelector('ol');

    let classes = olNode.className;
    assert.include(classes, 'breadcrumb');
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should have a navigation role', () => {
    render(<Breadcrumb />);

    let olNode = document.querySelector('ol');
    assert.equal(olNode.getAttribute('role'), 'navigation');
  });

  it('Should have an aria-label in ol', () => {
    render(<Breadcrumb />);

    let olNode = document.querySelector('ol');
    assert.equal(olNode.getAttribute('aria-label'), 'breadcrumbs');
  });
});
