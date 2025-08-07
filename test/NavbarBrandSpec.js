import { render, screen } from '@testing-library/react';
import React from 'react';

import NavbarBrand from '../src/NavbarBrand';

describe('<Navbar.Brand>', () => {
  it('Should create NavbarBrand SPAN element', () => {
    render(<NavbarBrand>Brand</NavbarBrand>);

    const brand = screen.getByText('Brand');

    assert.equal(brand.nodeName, 'SPAN');
    assert.ok(brand.className.match(/\bnavbar-brand\b/));
    assert.equal(brand.textContent, 'Brand');
  });

  it('Should create NavbarBrand A (link) element', () => {
    render(
      <NavbarBrand>
        <a href="">BrandLink</a>
      </NavbarBrand>
    );

    const brand = screen.getByText('BrandLink');

    assert.equal(brand.nodeName, 'A');
    assert.ok(brand.className.match(/\bnavbar-brand\b/));
    assert.equal(brand.textContent, 'BrandLink');
  });
});
