import { render } from '@testing-library/react';
import React from 'react';

import Pagination from '../src/Pagination';

describe('<Pagination>', () => {
  it('should have class', () => {
    render(<Pagination>Item content</Pagination>);
    assert.ok(document.querySelector('.pagination'));
  });
});
