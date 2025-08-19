import { render, screen } from '@testing-library/react';
import React from 'react';

import PageHeader from '../src/PageHeader';

describe('PageHeader', () => {
  it('Should output a div with content', () => {
    render(
      <PageHeader>
        <strong>Content</strong>
      </PageHeader>
    );
    assert.ok(screen.getByText('Content'));
  });

  it('Should have a page-header class', () => {
    render(<PageHeader>Content</PageHeader>);
    assert.ok(
      document.querySelector('.page-header').className.match(/\bpage-header\b/)
    );
  });
});
