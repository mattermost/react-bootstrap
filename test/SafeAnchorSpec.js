import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import SafeAnchor from '../src/SafeAnchor';

import { assertSingle } from './helpers';

describe('SafeAnchor', () => {
  it('renders an anchor tag', () => {
    const { container } = render(<SafeAnchor />);
    assertSingle(container, 'a').tagName.should.equal('A');
  });

  it('forwards provided href', () => {
    const { container } = render(<SafeAnchor href="http://google.com" />);
    container
      .querySelector('a')
      .getAttribute('href')
      .should.equal('http://google.com');
  });

  it('ensures that an href is provided', () => {
    const { container } = render(<SafeAnchor />);
    container.querySelector('a').hasAttribute('href').should.be.true;
  });

  it('forwards onClick handler', () => {
    const handleClick = sinon.spy();

    const { container } = render(<SafeAnchor onClick={handleClick} />);
    fireEvent.click(container.querySelector('a'));

    handleClick.should.have.been.calledOnce;
  });

  it('provides onClick handler as onKeyDown handler for "space"', () => {
    const handleClick = sinon.spy();

    const { container } = render(<SafeAnchor onClick={handleClick} />);
    fireEvent.keyDown(container.querySelector('a'), { key: ' ' });

    handleClick.should.have.been.calledOnce;
  });

  it('prevents default when no href is provided', () => {
    const handleClick = sinon.spy();

    const { container, rerender } = render(
      <SafeAnchor onClick={handleClick} />
    );
    fireEvent.click(container.querySelector('a'));

    rerender(<SafeAnchor onClick={handleClick} href="#" />);
    fireEvent.click(container.querySelector('a'));

    expect(handleClick).to.have.been.calledTwice;
    expect(handleClick.getCall(0).args[0].defaultPrevented).to.equal(true);
    expect(handleClick.getCall(1).args[0].defaultPrevented).to.equal(true);
  });

  it('does not prevent default when href is provided', () => {
    const handleClick = sinon.spy();

    const { container } = render(
      <SafeAnchor href="#foo" onClick={handleClick} />
    );
    fireEvent.click(container.querySelector('a'));

    expect(handleClick).to.have.been.calledOnce;
    expect(handleClick.getCall(0).args[0].defaultPrevented).to.equal(false);
  });

  it('Should disable link behavior', () => {
    let clickSpy = sinon.spy();
    let spy = sinon.spy(SafeAnchor.prototype, 'handleClick');

    const { container } = render(
      <SafeAnchor disabled href="#foo" onClick={clickSpy}>
        Title
      </SafeAnchor>
    );
    fireEvent.click(container.querySelector('a'));

    expect(spy).to.have.been.calledOnce;
    // Disabled links must not fire the user-provided onClick handler. This also
    // stands in for the removed `isPropagationStopped()` assertion: the disabled
    // path returns early after stopping propagation, so onClick is never called.
    expect(clickSpy).to.have.not.been.called;
    expect(spy.getCall(0).args[0].defaultPrevented).to.equal(true);

    spy.restore();
  });

  it('forwards provided role', () => {
    const { container } = render(<SafeAnchor role="test" />);
    container
      .querySelector('a')
      .getAttribute('role')
      .should.equal('test');
  });

  it('forwards provided role with href', () => {
    const { container } = render(
      <SafeAnchor role="test" href="http://google.com" />
    );
    container
      .querySelector('a')
      .getAttribute('role')
      .should.equal('test');
  });

  it('set role=button with no provided href', () => {
    const { container } = render(<SafeAnchor />);
    container
      .querySelector('a')
      .getAttribute('role')
      .should.equal('button');

    const { container: hashContainer } = render(<SafeAnchor href="#" />);
    hashContainer
      .querySelector('a')
      .getAttribute('role')
      .should.equal('button');
  });

  it('sets no role with provided href', () => {
    const { container } = render(<SafeAnchor href="http://google.com" />);
    expect(container.querySelector('a').getAttribute('role')).to.not.exist;
  });
});
