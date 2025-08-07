import { render, screen } from '@testing-library/react';
import React from 'react';

import Modal from '../src/Modal';

describe('Modal.Footer', () => {
  it('uses "div" by default', () => {
    render(<Modal.Footer />);

    assert.equal(document.querySelector('.modal-footer').nodeName, 'DIV');
  });

  it('has "modal-footer" class', () => {
    render(<Modal.Footer />);

    assert.include(
      document.querySelector('.modal-footer').className,
      'modal-footer'
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Modal.Footer className="custom-class" />);
    const classes = document.querySelector('.modal-footer').className;

    assert.include(classes, 'modal-footer');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "div"', () => {
    render(<Modal.Footer componentClass="section" />);

    assert.equal(document.querySelector('.modal-footer').nodeName, 'SECTION');
  });

  it('should render children', () => {
    render(
      <Modal.Footer>
        <strong>Content</strong>
      </Modal.Footer>
    );
    assert.ok(screen.getByText('Content'));
  });
});
