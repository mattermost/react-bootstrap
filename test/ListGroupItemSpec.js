import { render, screen } from '@testing-library/react';
import React from 'react';

import ListGroupItem from '../src/ListGroupItem';

describe('<ListGroupItem>', () => {
  it('Should output a "span" with the class "list-group-item"', () => {
    render(<ListGroupItem>Text</ListGroupItem>);
    assert.equal(screen.getByText('Text').nodeName, 'SPAN');
    assert.ok(screen.getByText('Text').classList.contains('list-group-item'));
  });

  it('Should output an "anchor" if "href" prop is set', () => {
    render(<ListGroupItem href="#test">Anchor</ListGroupItem>);
    assert.equal(screen.getByText('Anchor').nodeName, 'A');
    assert.ok(screen.getByText('Anchor').classList.contains('list-group-item'));
  });

  it('Should output a "button" if an "onClick" handler is set', () => {
    let noop = () => {};
    render(<ListGroupItem onClick={noop}>Button</ListGroupItem>);
    assert.equal(screen.getByText('Button').nodeName, 'BUTTON');
    assert.ok(screen.getByText('Button').classList.contains('list-group-item'));
  });

  it('Should output an "li" if "listItem" prop is set', () => {
    render(<ListGroupItem listItem>Item 1</ListGroupItem>);
    assert.equal(screen.getByText('Item 1').nodeName, 'LI');
    assert.ok(screen.getByText('Item 1').classList.contains('list-group-item'));
  });

  it('Should support "bsStyle" prop', () => {
    render(<ListGroupItem bsStyle="success">Item 1</ListGroupItem>);
    assert.ok(
      screen.getByText('Item 1').classList.contains('list-group-item-success')
    );
  });

  it('Should support "active" and "disabled" prop', () => {
    render(<ListGroupItem active>Item 1</ListGroupItem>);
    assert.ok(screen.getByText('Item 1').classList.contains('active'));
  });

  it('Should support "disabled" prop', () => {
    render(<ListGroupItem disabled>Item 2</ListGroupItem>);
    assert.ok(screen.getByText('Item 2').classList.contains('disabled'));
  });

  it('Should support "header" prop as a string', () => {
    render(<ListGroupItem header="Heading">Item text</ListGroupItem>);

    let node = document.querySelector('.list-group-item');
    assert.equal(node.firstChild.nodeName, 'H4');
    assert.equal(node.firstChild.textContent, 'Heading');
    assert.ok(node.firstChild.className.match(/\blist-group-item-heading\b/));
    assert.equal(node.lastChild.nodeName, 'P');
    assert.equal(node.lastChild.textContent, 'Item text');
    assert.ok(node.lastChild.className.match(/\blist-group-item-text\b/));
  });

  it('Should support "header" prop as a ReactComponent', () => {
    let header = <h2>Heading</h2>;
    render(<ListGroupItem header={header}>Item text</ListGroupItem>);

    let node = document.querySelector('.list-group-item');
    assert.equal(node.firstChild.nodeName, 'H2');
    assert.equal(node.firstChild.textContent, 'Heading');
    assert.ok(node.firstChild.className.match(/\blist-group-item-heading\b/));
    assert.equal(node.lastChild.nodeName, 'P');
    assert.equal(node.lastChild.textContent, 'Item text');
    assert.ok(node.lastChild.className.match(/\blist-group-item-text\b/));
  });
});
