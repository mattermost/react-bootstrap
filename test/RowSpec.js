import { render } from '@testing-library/react';
import React from 'react';

import Row from '../src/Row';

describe('Row', () => {
  it('uses "div" by default', () => {
    render(<Row />);

    assert.equal(document.querySelector('.row').nodeName, 'DIV');
  });

  it('has "row" class', () => {
    render(<Row>Row content</Row>);
    assert.equal(document.querySelector('.row').className, 'row');
  });

  it('Should merge additional classes passed in', () => {
    render(<Row className="bob" />);
    assert.ok(document.querySelector('.row').className.match(/\bbob\b/));
    assert.ok(document.querySelector('.row').className.match(/\brow\b/));
  });

  it('allows custom elements instead of "div"', () => {
    render(<Row componentClass="section" />);

    assert.equal(document.querySelector('.row').nodeName, 'SECTION');
  });
});
