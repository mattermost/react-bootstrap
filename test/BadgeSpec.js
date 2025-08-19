import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';

import Badge from '../src/Badge';

describe('<Badge>', () => {
  it('Should output a badge with content', () => {
    render(
      <Badge>
        <strong>Content</strong>
      </Badge>
    );
    assert.ok(screen.getByText('Content'));
  });

  it('Should have a badge class', () => {
    render(<Badge>Content</Badge>);
    assert.ok(screen.getByText('Content').className.match(/\bbadge\b/));
  });

  it('Should have a badge using a number', () => {
    let count = 42;
    render(<Badge>{count}</Badge>);
    assert.ok(screen.getByText('42').className.match(/\bbadge\b/));
  });

  it('Should have a badge using a a mix of content', () => {
    let count = 42;
    render(<Badge>£{count}</Badge>);
    assert.ok(screen.getByText('£42').className.match(/\bbadge\b/));
  });

  it('Should have a badge class pulled right', () => {
    render(<Badge pullRight>Content</Badge>);
    assert.ok(screen.getByText('Content').className.match(/\bpull-right\b/));
  });

  describe('Hides when empty', () => {
    it('should hide with no children', () => {
      render(<Badge />);
      assert.ok(document.querySelector('.badge').className.match(/\bhidden\b/));
    });

    it('should hide with empty string', () => {
      render(<Badge />);
      assert.ok(document.querySelector('.badge').className.match(/\bhidden\b/));
    });

    it('should not hide 0', () => {
      render(<Badge>{0}</Badge>);
      assert.notOk(screen.getByText('0').className.match(/\bhidden\b/));
    });
  });
});
