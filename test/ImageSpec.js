import { render, screen } from '@testing-library/react';
import React from 'react';

import Image from '../src/Image';

describe('Image', () => {
  it('should be an image', () => {
    render(<Image />);
    let image = screen.getByRole('img');

    image.nodeName.should.equal('IMG');
  });

  it('should provide src and alt prop', () => {
    render(<Image src="image.jpg" alt="this is alt" />);
    let image = screen.getByRole('img');

    assert.equal(image.getAttribute('src'), 'image.jpg');
    assert.equal(image.getAttribute('alt'), 'this is alt');
  });

  it('should have correct class when responsive prop is set', () => {
    render(<Image responsive />);
    let imageClassName = screen.getByRole('img').className;

    imageClassName.should.match(/\bimg-responsive\b/);
  });

  it('should have correct class when rounded prop is set', () => {
    render(<Image rounded />);
    let imageClassName = screen.getByRole('img').className;

    imageClassName.should.match(/\bimg-rounded\b/);
  });

  it('should have correct class when circle prop is set', () => {
    render(<Image circle />);
    let imageClassName = screen.getByRole('img').className;

    imageClassName.should.match(/\bimg-circle\b/);
  });

  it('should have correct class when thumbnail prop is set', () => {
    render(<Image thumbnail />);
    let imageClassName = screen.getByRole('img').className;

    imageClassName.should.match(/\bimg-thumbnail\b/);
  });
});
