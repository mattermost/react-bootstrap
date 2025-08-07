import { render, screen } from '@testing-library/react';
import React from 'react';

import Modal from '../src/Modal';

describe('Modal.Body', () => {
  it('uses "div" by default', () => {
    render(<Modal.Body />);

    assert.equal(document.querySelector('.modal-body').nodeName, 'DIV');
  });

  it('has "modal-body" class', () => {
    render(<Modal.Body />);

    assert.include(
      document.querySelector('.modal-body').className,
      'modal-body'
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Modal.Body className="custom-class" />);
    const classes = document.querySelector('.modal-body').className;

    assert.include(classes, 'modal-body');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "div"', () => {
    render(<Modal.Body componentClass="section" />);

    assert.equal(document.querySelector('.modal-body').nodeName, 'SECTION');
  });

  it('should render children', () => {
    render(
      <Modal.Body>
        <strong>Content</strong>
      </Modal.Body>
    );
    assert.ok(screen.getByText('Content'));
  });
});
