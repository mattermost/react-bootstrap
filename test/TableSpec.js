import { render, screen } from '@testing-library/react';
import React from 'react';

import Table from '../src/Table';

describe('Table', () => {
  it('Should be a table', () => {
    render(<Table />);
    assert.equal(screen.getByRole('table').nodeName, 'TABLE');
    assert.ok(screen.getByRole('table').className.match(/\btable\b/));
  });

  it('Should have correct class when striped', () => {
    render(<Table striped />);
    assert.ok(screen.getByRole('table').className.match(/\btable-striped\b/));
  });

  it('Should have correct class when hover', () => {
    render(<Table hover />);
    assert.ok(screen.getByRole('table').className.match(/\btable-hover\b/));
  });

  it('Should have correct class when bordered', () => {
    render(<Table bordered />);
    assert.ok(screen.getByRole('table').className.match(/\btable-bordered\b/));
  });

  it('Should have correct class when condensed', () => {
    render(<Table condensed />);
    assert.ok(screen.getByRole('table').className.match(/\btable-condensed\b/));
  });

  it('Should have responsive wrapper', () => {
    render(<Table responsive />);
    assert.ok(
      document
        .querySelector('.table-responsive')
        .className.match(/\btable-responsive\b/)
    );
    assert.ok(
      document
        .querySelector('.table-responsive')
        .firstChild.className.match(/\btable\b/)
    );
  });
});
