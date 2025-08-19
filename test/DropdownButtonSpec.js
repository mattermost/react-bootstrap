import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DropdownButton from '../src/DropdownButton';
import MenuItem from '../src/MenuItem';

describe('<DropdownButton>', () => {
  const simpleDropdown = (
    <DropdownButton title="Simple Dropdown" id="test-id">
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </DropdownButton>
  );

  it('renders title prop', () => {
    render(simpleDropdown);
    const buttonNode = screen.getByRole('button');

    buttonNode.textContent.should.match(/Simple Dropdown/);
  });

  it('renders dropdown toggle button', () => {
    render(simpleDropdown);

    const buttonNode = screen.getByRole('button');

    buttonNode.tagName.should.equal('BUTTON');
    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('type').should.equal('button');
    buttonNode.getAttribute('aria-expanded').should.equal('false');
    buttonNode.getAttribute('id').should.be.ok;
  });

  it('renders single MenuItem child', () => {
    render(
      <DropdownButton title="Single child" id="test-id">
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );

    const menuNode = screen.getByRole('menu');

    expect(menuNode.children.length).to.equal(1);
  });

  it('forwards pullRight to menu', () => {
    render(
      <DropdownButton pullRight title="blah" id="test-id">
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const menu = screen.getByRole('menu');

    menu.className.should.match(/\bdropdown-menu-right\b/);
  });

  it('renders bsSize', () => {
    render(
      <DropdownButton title="blah" bsSize="small" id="test-id">
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const node = screen.getByRole('button').parentElement;

    node.className.should.match(/\bbtn-group-sm\b/);
  });

  it('renders bsStyle', () => {
    render(
      <DropdownButton title="blah" bsStyle="success" id="test-id">
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const buttonNode = screen.getByRole('button');

    buttonNode.className.should.match(/\bbtn-success\b/);
  });

  it('forwards onSelect handler to MenuItems', done => {
    const selectedEvents = [];

    const onSelect = eventKey => {
      selectedEvents.push(eventKey);

      if (selectedEvents.length === 4) {
        selectedEvents.should.eql(['1', '2', '3', '4']);
        done();
      }
    };
    render(
      <DropdownButton title="Simple Dropdown" onSelect={onSelect} id="test-id">
        <MenuItem eventKey="1">Item 1</MenuItem>
        <MenuItem eventKey="2">Item 2</MenuItem>
        <MenuItem eventKey="3">Item 3</MenuItem>
        <MenuItem eventKey="4">Item 4</MenuItem>
      </DropdownButton>
    );

    const menuItems = screen.getAllByRole('menuitem');

    menuItems.forEach(item => {
      userEvent.click(item);
    });
  });

  it('closes when child MenuItem is selected', async () => {
    render(
      <DropdownButton title="Simple Dropdown" id="test-id">
        <MenuItem eventKey="1">Item 1</MenuItem>
      </DropdownButton>
    );

    const node = screen.getByRole('button').parentElement;

    const buttonNode = screen.getByRole('button');
    await userEvent.click(buttonNode);
    node.className.should.match(/\bopen\b/);

    const menuItem = screen.getByRole('menuitem');
    await userEvent.click(menuItem);
    node.className.should.not.match(/\bopen\b/);
  });

  it('does not close when onToggle is controlled', async () => {
    const handleSelect = () => {};

    render(
      <DropdownButton
        title="Simple Dropdown"
        open
        onToggle={handleSelect}
        id="test-id"
      >
        <MenuItem eventKey="1">Item 1</MenuItem>
      </DropdownButton>
    );

    const node = screen.getByRole('button').parentElement;
    const buttonNode = screen.getByRole('button');

    const menuItem = screen.getByRole('menuitem');

    await userEvent.click(buttonNode);
    node.className.should.match(/\bopen\b/);
    await userEvent.click(menuItem);

    node.className.should.match(/\bopen\b/);
  });

  it('Should pass props to button', () => {
    render(
      <DropdownButton title="Title" bsStyle="primary" id="testId" disabled>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    const buttonNode = screen.getByRole('button');

    assert.ok(buttonNode.className.match(/\bbtn-primary\b/));
    assert.equal(buttonNode.getAttribute('id'), 'testId');
    assert.ok(buttonNode.disabled);
  });

  it('should derive bsClass from parent', () => {
    render(
      <DropdownButton title="title" id="test-id" bsClass="my-dropdown">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownButton>
    );

    assert.ok(
      screen.getByRole('button').classList.contains('my-dropdown-toggle')
    );
    assert.ok(screen.getByRole('menu').classList.contains('my-dropdown-menu'));
  });

  it('should pass defaultOpen to `<Dropdown>`', () => {
    render(
      <DropdownButton id="test-id" title="title" defaultOpen>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownButton>
    );

    const toggle = screen.getByRole('button');

    expect(toggle.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should pass onMouseEnter and onMouseLeave to `<Dropdown>`', async () => {
    const onMouseEnter = sinon.spy();
    const onMouseLeave = sinon.spy();

    render(
      <DropdownButton
        id="test-id"
        title="title"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownButton>
    );

    const dropdown = document.querySelector('.dropdown');

    expect(onMouseEnter).to.not.have.been.called;
    expect(onMouseLeave).to.not.have.been.called;

    await userEvent.hover(dropdown);

    expect(onMouseEnter).to.have.been.called.once;
    expect(onMouseLeave).to.not.have.been.called;

    await userEvent.unhover(dropdown);

    expect(onMouseEnter).to.have.been.called.once;
    expect(onMouseLeave).to.have.been.called.once;
  });
});
