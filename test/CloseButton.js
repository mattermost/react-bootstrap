import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import CloseButton from '../src/CloseButton';

describe('<CloseButton>', () => {
  it('Should output a button', () => {
    let noOp = () => {};
    render(<CloseButton onClick={noOp} />);
    assert.equal(screen.getByRole('button').nodeName, 'BUTTON');
  });

  it('Should have type=button by default', () => {
    let noOp = () => {};
    render(<CloseButton onClick={noOp} />);
    assert.equal(screen.getByRole('button').getAttribute('type'), 'button');
  });

  it('Should have class=close by default', () => {
    let noOp = () => {};
    render(<CloseButton onClick={noOp} />);
    assert.equal(screen.getByRole('button').getAttribute('class'), 'close');
  });

  it('Should call onClick callback', done => {
    let doneOp = () => {
      done();
    };
    render(<CloseButton onClick={doneOp} />);
    userEvent.click(screen.getByRole('button'));
  });

  it('Should have a span with aria-hidden=true', () => {
    let noOp = () => {};
    render(<CloseButton onClick={noOp} />);
    assert.equal(
      screen.getByRole('button').children[0].getAttribute('aria-hidden'),
      'true'
    );
  });

  it('Should have a span with text of &times; (char code 215)', () => {
    let noOp = () => {};
    render(<CloseButton onClick={noOp} />);
    assert.equal(
      screen.getByRole('button').children[0].innerHTML.charCodeAt(0),
      '215'
    );
  });

  it('Should have a span with class=sr-only', () => {
    let noOp = () => {};
    render(<CloseButton onClick={noOp} />);
    assert.equal(
      screen.getByRole('button').children[1].getAttribute('class'),
      'sr-only'
    );
  });

  it('Should have a span with text defaulted to "Close"', () => {
    let noOp = () => {};
    render(<CloseButton onClick={noOp} />);
    assert.equal(screen.getByRole('button').children[1].innerHTML, 'Close');
  });

  it('Should have a span with the custom text of the label', () => {
    let noOp = () => {};
    let label = 'Close Item';
    render(<CloseButton onClick={noOp} label={label} />);
    assert.equal(screen.getByRole('button').children[1].innerHTML, label);
  });
});
