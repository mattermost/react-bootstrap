import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import MenuItem from '../src/MenuItem';
import Nav from '../src/Nav';
import NavDropdown from '../src/NavDropdown';

describe('<NavDropdown>', () => {
  it('Should render li when in nav', () => {
    render(
      <Nav>
        <NavDropdown title="Title" className="test-class" id="nav-test">
          <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
          <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
        </NavDropdown>
      </Nav>
    );

    const dropdown = document.querySelector('.dropdown');
    const button = screen.getByRole('button');

    assert.equal(dropdown.nodeName, 'LI');
    assert.ok(dropdown.className.match(/\bdropdown\b/));
    assert.ok(dropdown.className.match(/\btest-class\b/));
    assert.notOk(dropdown.className.match(/\bactive\b/));
    assert.equal(button.nodeName, 'A');
    assert.equal(button.textContent.trim(), 'Title');
  });

  it('renders div with active class', () => {
    render(
      <NavDropdown active title="Title" className="test-class" id="nav-test">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </NavDropdown>
    );

    const li = document.querySelector('.dropdown');

    assert.ok(li.className.match(/\btest-class\b/)); // it still has the given className
    assert.ok(li.className.match(/\bactive\b/)); // plus the active class
  });

  it('is open with explicit prop', async () => {
    class OpenProp extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          open: false
        };
      }

      render() {
        return (
          <div>
            <button
              className="outer-button"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              Outer button
            </button>
            <NavDropdown
              open={this.state.open}
              onToggle={() => {}}
              title="Prop open control"
              id="test-id"
            >
              <MenuItem eventKey="1">Item 1</MenuItem>
            </NavDropdown>
          </div>
        );
      }
    }

    render(<OpenProp />);
    const outerToggle = screen.getByText('Outer button');
    const dropdownNode = document.querySelector('.dropdown');

    dropdownNode.className.should.not.match(/\bopen\b/);
    await userEvent.click(outerToggle);
    dropdownNode.className.should.match(/\bopen\b/);
    await userEvent.click(outerToggle);
    dropdownNode.className.should.not.match(/\bopen\b/);
  });

  it('should handle child active state', () => {
    render(
      <NavDropdown id="test-id" title="title" activeKey="2">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
        <MenuItem eventKey="3">MenuItem 3 content</MenuItem>
      </NavDropdown>
    );

    expect(document.querySelector('.dropdown').className).to.match(/active/);

    const items = screen
      .getAllByRole('menuitem')
      .map(element => element.parentElement);
    expect(items[0].className).to.not.match(/active/);
    expect(items[1].className).to.match(/active/);
    expect(items[2].className).to.not.match(/active/);
  });

  it('should derive bsClass from parent', () => {
    render(
      <NavDropdown title="title" id="test-id" bsClass="my-dropdown">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </NavDropdown>
    );

    assert.ok(
      screen.getByRole('button').classList.contains('my-dropdown-toggle')
    );
    assert.ok(screen.getByRole('menu').classList.contains('my-dropdown-menu'));
  });
});
