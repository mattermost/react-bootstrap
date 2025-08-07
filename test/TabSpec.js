import { render, screen } from '@testing-library/react';
import React from 'react';

import Tab from '../src/Tab';

describe('<Tab>', () => {
  it('Should have class', () => {
    render(<Tab>Item content</Tab>);
    assert.ok(screen.getByRole('tabpanel').classList.contains('tab-pane'));
  });

  it('Should add active class', () => {
    render(<Tab>Item content</Tab>);
    assert.ok(screen.getByRole('tabpanel').classList.contains('active'));
  });

  it('Should not add active class when not visible', () => {
    render(<Tab eventKey={{}}>Item content</Tab>);
    assert.lengthOf(document.querySelectorAll('.active'), 0);
  });

  describe('Web Accessibility', () => {
    it('Should have aria-hidden false when visible', () => {
      render(<Tab>Item content</Tab>);

      assert.equal(
        screen.getByRole('tabpanel').getAttribute('aria-hidden'),
        'false'
      );
    });

    it('Should have aria-hidden true when hidden', () => {
      render(<Tab eventKey={{}}>Item content</Tab>);

      assert.equal(
        screen
          .getByRole('tabpanel', { hidden: true })
          .getAttribute('aria-hidden'),
        'true'
      );
    });

    it('Should have role', () => {
      render(<Tab>Item content</Tab>);

      assert.equal(
        screen.getByText('Item content').getAttribute('role'),
        'tabpanel'
      );
    });
  });
});
