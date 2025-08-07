import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Modal from '../src/Modal';

describe('Modal.Header', () => {
  it('uses "div" by default', () => {
    render(<Modal.Header />);

    assert.equal(document.querySelector('.modal-header').nodeName, 'DIV');
  });

  it('has "modal-header" class', () => {
    render(<Modal.Header />);

    assert.include(
      document.querySelector('.modal-header').className,
      'modal-header'
    );
  });

  it('should merge additional classes passed in', () => {
    render(<Modal.Header className="custom-class" />);
    const classes = document.querySelector('.modal-header').className;

    assert.include(classes, 'modal-header');
    assert.include(classes, 'custom-class');
  });

  it('should render children', () => {
    render(
      <Modal.Header>
        <strong>Content</strong>
      </Modal.Header>
    );

    assert.ok(screen.getByText('Content'));
  });

  it('has closeButton without a containing Modal and renders', () => {
    render(<Modal.Header closeButton />);

    assert.isNotNull(document.querySelector('.modal-header'));
  });

  it('Should trigger onHide when modal is closed', async () => {
    const onHideSpy = sinon.spy();
    render(<Modal.Header closeButton onHide={onHideSpy} />);

    const closeButton = screen.getByRole('button', { name: 'Close' });

    await userEvent.click(closeButton);

    expect(onHideSpy).to.have.been.called;
  });
});
