import { render, screen } from '@testing-library/react';
import pick from 'lodash/pick';
import React from 'react';

import Tooltip from '../src/Tooltip';

describe('Tooltip', () => {
  it('Should output a tooltip with content', () => {
    render(
      <Tooltip id="test-tooltip" positionTop={10} positionLeft={20}>
        <strong>Tooltip Content</strong>
      </Tooltip>
    );
    assert.ok(screen.getByText('Tooltip Content'));

    const tooltip = screen.getByRole('tooltip');
    expect(pick(tooltip.style, ['top', 'left'])).to.eql({
      top: '10px',
      left: '20px'
    });
  });

  describe('When a style property is provided', () => {
    it('Should render a tooltip with merged styles', () => {
      render(
        <Tooltip
          id="test-tooltip"
          style={{ opacity: 0.9 }}
          positionTop={10}
          positionLeft={20}
        >
          <strong>Tooltip Content</strong>
        </Tooltip>
      );
      const tooltip = screen.getByRole('tooltip');
      expect(pick(tooltip.style, ['top', 'left'])).to.eql({
        top: '10px',
        left: '20px'
      });
      // Decimal point string depends on locale
      expect(parseFloat(tooltip.style.opacity)).to.eql(0.9);
    });
  });
});
