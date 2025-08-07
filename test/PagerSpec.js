import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Pager from '../src/Pager';

describe('Pager', () => {
  it('Should output a unordered list as root element with class "pager"', () => {
    render(<Pager />);
    assert.equal(document.querySelector('.pager').nodeName, 'UL');
  });

  it('Should allow "Pager.Item" as child element', () => {
    render(
      <Pager>
        <Pager.Item href="#">Top</Pager.Item>
      </Pager>
    );
    assert.equal(document.querySelector('.pager').children.length, 1);
    assert.equal(document.querySelector('.pager').children[0].nodeName, 'LI');
  });

  it('Should allow multiple "Pager.Item" as child elements', () => {
    render(
      <Pager>
        <Pager.Item previous href="#">
          Previous
        </Pager.Item>
        <Pager.Item disabled href="#">
          Top
        </Pager.Item>
        <Pager.Item next href="#">
          Next
        </Pager.Item>
      </Pager>
    );
    assert.equal(
      screen.getByRole('button', { name: 'Previous' }).parentElement.className,
      'previous'
    );
    assert.equal(
      screen.getByRole('button', { name: 'Top' }).parentElement.className,
      'disabled'
    );
    assert.equal(
      screen.getByRole('button', { name: 'Next' }).parentElement.className,
      'next'
    );
  });

  it('Should call "onSelect" when item is clicked', done => {
    function handleSelect(key, e) {
      assert.equal(key, 2);
      assert.equal(e.target.hash, '#next');
      done();
    }
    render(
      <Pager onSelect={handleSelect}>
        <Pager.Item eventKey={1} href="#prev">
          Previous
        </Pager.Item>
        <Pager.Item eventKey={2} href="#next">
          Next
        </Pager.Item>
      </Pager>
    );

    userEvent.click(screen.getByText('Next'));
  });
});
