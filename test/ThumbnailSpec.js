import { act, render, screen } from '@testing-library/react';
import React from 'react';

import Thumbnail from '../src/Thumbnail';

describe('<Thumbnail>', () => {
  it('Should have a thumbnail class and be an anchor', () => {
    render(<Thumbnail href="#" src="#" alt="test" />);
    assert.ok(
      document.querySelector('.thumbnail').className.match(/\bthumbnail\b/)
    );
    assert.equal(screen.getByRole('button').nodeName, 'A');
  });

  it('Should have an image', () => {
    render(<Thumbnail href="#" src="#" alt="test" />);
    assert.ok(screen.getByRole('img'));
  });

  it('Should have a thumbnail class and be a div', () => {
    render(<Thumbnail src="#" alt="test" />);
    assert.ok(
      document.querySelector('.thumbnail').className.match(/\bthumbnail\b/)
    );
    assert.equal(document.querySelector('.thumbnail').nodeName, 'DIV');
  });

  it('Should have an image', () => {
    render(<Thumbnail src="#" alt="test" />);
    assert.ok(screen.getByRole('img'));
  });

  it('Should have an inner div with class caption', () => {
    render(
      <Thumbnail src="#" alt="test">
        Test
        <div>Test child element</div>
      </Thumbnail>
    );
    assert.ok(
      document
        .querySelector('.thumbnail')
        .lastChild.className.match(/\bcaption\b/)
    );
  });

  it('Should have an inner div with class caption in an anchor', () => {
    render(
      <Thumbnail href="#" src="#" alt="test">
        Test
        <div>Test child element</div>
      </Thumbnail>
    );
    assert.ok(
      document
        .querySelector('.thumbnail')
        .lastChild.className.match(/\bcaption\b/)
    );
  });

  it('Should have an img with an onError callback', () => {
    const onErrorSpy = sinon.spy();
    render(<Thumbnail href="#" src="#" alt="test" onError={onErrorSpy} />);
    const img = screen.getByRole('img');
    act(() => {
      img.dispatchEvent(new ErrorEvent('error'));
    });
    expect(onErrorSpy).to.have.been.calledOnce;
  });

  it('Should have an img with an onLoad callback', () => {
    const onLoadSpy = sinon.spy();
    render(<Thumbnail href="#" src="#" alt="test" onLoad={onLoadSpy} />);
    const img = screen.getByRole('img');
    act(() => {
      img.dispatchEvent(new Event('load'));
    });
    expect(onLoadSpy).to.have.been.calledOnce;
  });
});
