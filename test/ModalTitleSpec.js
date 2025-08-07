import { render, screen } from '@testing-library/react';
import React from 'react';

import Modal from '../src/Modal';

describe('Modal.Title', () => {
  it('uses "h4" by default', () => {
    render(<Modal.Title />);

    assert.equal(document.querySelector('.modal-title').nodeName, 'H4');
  });

  it('has "modal-title" class', () => {
    render(<Modal.Title />);

    assert.include(
      document.querySelector('.modal-title').className,
      'modal-title'
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Modal.Title className="custom-class" />);
    const classes = document.querySelector('.modal-title').className;

    assert.include(classes, 'modal-title');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "h4"', () => {
    render(<Modal.Title componentClass="h3" />);

    assert.equal(document.querySelector('.modal-title').nodeName, 'H3');
  });

  it('should render children', () => {
    render(
      <Modal.Title>
        <strong>Children</strong>
      </Modal.Title>
    );
    assert.ok(screen.getByText('Children'));
  });
});
