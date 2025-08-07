import { render } from '@testing-library/react';
import React from 'react';

import Glyphicon from '../src/Glyphicon';

describe('<Glyphicon>', () => {
  it('Should have correct class', () => {
    render(<Glyphicon glyph="star" />);
    assert.ok(
      document.querySelector('.glyphicon').className.match(/\bglyphicon\b/)
    );
    assert.ok(
      document.querySelector('.glyphicon').className.match(/\bglyphicon-star\b/)
    );
  });

  it('renders without the .form-control-feedback class', () => {
    render(<Glyphicon glyph="star" />);

    assert.notOk(
      document
        .querySelector('.glyphicon')
        .className.match(/\bform-control-feedback\b/)
    );
  });
});
