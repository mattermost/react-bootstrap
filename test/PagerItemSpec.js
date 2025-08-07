import { render, screen } from '@testing-library/react';
import React from 'react';

import Pager from '../src/Pager';
import userEvent from '@testing-library/user-event';

describe('PagerItem', () => {
  it('Should output a "list item" as root element, and an "anchor" as a child item', () => {
    render(<Pager.Item href="#">Text</Pager.Item>);

    let node = screen.getByRole('button', { name: 'Text' }).parentElement;
    assert.equal(node.nodeName, 'LI');
    assert.equal(node.children.length, 1);
    assert.equal(node.children[0].nodeName, 'A');
  });

  it('Should output "disabled" attribute as a class', () => {
    render(
      <Pager.Item disabled href="#">
        Text
      </Pager.Item>
    );
    assert.equal(
      screen.getByRole('button', { name: 'Text' }).parentElement.className,
      'disabled'
    );
  });

  it('Should output "next" attribute as a class', () => {
    render(
      <Pager.Item previous href="#">
        Previous
      </Pager.Item>
    );
    assert.equal(
      screen.getByRole('button', { name: 'Previous' }).parentElement.className,
      'previous'
    );
  });

  it('Should output "previous" attribute as a class', () => {
    render(
      <Pager.Item next href="#">
        Next
      </Pager.Item>
    );
    assert.equal(
      screen.getByRole('button', { name: 'Next' }).parentElement.className,
      'next'
    );
  });

  it('Should call "onSelect" when item is clicked', done => {
    function handleSelect(key) {
      assert.equal(key, 1);
      done();
    }
    render(
      <Pager.Item eventKey={1} onSelect={handleSelect}>
        Next
      </Pager.Item>
    );
    userEvent.click(screen.getByRole('button', { name: 'Next' }));
  });

  it('Should not call "onSelect" when item disabled and is clicked', () => {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    render(
      <Pager.Item disabled onSelect={handleSelect}>
        Next
      </Pager.Item>
    );
    userEvent.click(screen.getByRole('button', { name: 'Next' }));
  });

  it('Should set target attribute on anchor', () => {
    render(
      <Pager.Item next href="#" target="_blank">
        Next
      </Pager.Item>
    );

    let anchor = screen.getByRole('button', { name: 'Next' });
    assert.equal(anchor.getAttribute('target'), '_blank');
  });

  it('Should call "onSelect" with target attribute', done => {
    function handleSelect(key, e) {
      assert.equal(e.target.target, '_blank');
      done();
    }
    render(
      <Pager.Item eventKey={1} onSelect={handleSelect} target="_blank">
        Next
      </Pager.Item>
    );
    userEvent.click(screen.getByRole('button', { name: 'Next' }));
  });
});
