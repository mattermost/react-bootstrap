import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import NavItem from '../src/NavItem';

describe('<NavItem>', () => {
  it('Should add active class', () => {
    render(<NavItem active>Item content</NavItem>);
    assert.ok(
      screen
        .getByText('Item content')
        .parentElement.classList.contains('active')
    );
  });

  it('Should add disabled class', () => {
    render(<NavItem disabled>Item content</NavItem>);
    assert.ok(
      screen
        .getByText('Item content')
        .parentElement.classList.contains('disabled')
    );
  });

  it('Should add DOM properties', () => {
    render(
      <NavItem href="/some/unique-thing/" title="content">
        Item content
      </NavItem>
    );
    let linkElement = screen.getByText('Item content');
    assert.ok(linkElement.href.indexOf('/some/unique-thing/') >= 0);
    assert.equal(linkElement.title, 'content');
  });

  it('Should not add anchor properties to li', () => {
    render(
      <NavItem href="/hi" title="boom!">
        Item content
      </NavItem>
    );

    assert.ok(!document.querySelector('li').hasAttribute('href'));
    assert.ok(!document.querySelector('li').hasAttribute('title'));
  });

  it('Should pass tabIndex to the anchor', () => {
    render(
      <NavItem href="/hi" tabIndex="3" title="boom!">
        Item content
      </NavItem>
    );

    let node = screen.getByText('Item content').parentElement;

    expect(node.hasAttribute('tabindex')).to.equal(false);
    expect(node.firstChild.getAttribute('tabindex')).to.equal('3');
  });

  it('Should call `onSelect` when item is selected', done => {
    function handleSelect(key) {
      assert.equal(key, '2');
      done();
    }
    render(
      <NavItem eventKey="2" onSelect={handleSelect}>
        <span>Item content</span>
      </NavItem>
    );
    userEvent.click(screen.getByText('Item content'));
  });

  it('Should not call `onSelect` when item disabled and is selected', () => {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    render(
      <NavItem disabled onSelect={handleSelect}>
        <span>Item content</span>
      </NavItem>
    );
    userEvent.click(screen.getByText('Item content'));
  });

  it('Should set target attribute on anchor', () => {
    render(
      <NavItem href="/some/unique-thing/" target="_blank">
        Item content
      </NavItem>
    );
    let linkElement = screen.getByText('Item content');
    assert.equal(linkElement.target, '_blank');
  });

  it('Should call `onSelect` with event', done => {
    function handleSelect(key, event) {
      assert.ok(event.target.tagName === 'SPAN');
      done();
    }
    render(
      <NavItem onSelect={handleSelect} target="_blank">
        <span>Item content</span>
      </NavItem>
    );
    userEvent.click(screen.getByText('Item content'));
  });

  it('Should set role="button" when href=="#"', () => {
    render(
      <NavItem href="#" target="_blank">
        Item content
      </NavItem>
    );

    let linkElement = screen.getByText('Item content');
    assert(linkElement.outerHTML.match('role="button"'), true);
  });

  it('Should not set role when href!="#"', () => {
    render(
      <NavItem href="/path/to/stuff" target="_blank">
        Item content
      </NavItem>
    );

    let linkElement = screen.getByText('Item content');
    assert.equal(linkElement.outerHTML.match('role="button"'), null);
  });

  describe('Web Accessibility', () => {
    it('Should pass aria-controls to the link', () => {
      render(
        <NavItem href="/path/to/stuff" target="_blank" aria-controls="hi">
          Item content
        </NavItem>
      );

      let linkElement = screen.getByText('Item content');

      assert.ok(linkElement.hasAttribute('aria-controls'));
    });

    it('Should add aria-selected to the link when role is "tab"', () => {
      render(
        <NavItem role="tab" active>
          Item content
        </NavItem>
      );

      let linkElement = screen.getByText('Item content');

      expect(linkElement.getAttribute('aria-selected')).to.equal('true');
    });

    it('Should not add aria-selected to the link when role is not "tab"', () => {
      render(
        <NavItem role="button" active>
          Item content
        </NavItem>
      );

      let linkElement = screen.getByText('Item content');

      expect(linkElement.getAttribute('aria-selected')).to.not.exist;
    });

    it('Should pass role down', () => {
      render(<NavItem role="tab">Item content</NavItem>);

      let linkElement = screen.getByText('Item content');

      assert.equal(linkElement.getAttribute('role'), 'tab');
    });
  });
});
