import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DropdownMenu from '../src/DropdownMenu';
import MenuItem from '../src/MenuItem';

/* eslint-disable no-await-in-loop */

describe('<Dropdown.Menu>', () => {
  const simpleMenu = (
    <DropdownMenu>
      <MenuItem eventKey="1">Item 1</MenuItem>
      <MenuItem eventKey="2">Item 2</MenuItem>
      <MenuItem eventKey="3">Item 3</MenuItem>
      <MenuItem eventKey="4">Item 4</MenuItem>
    </DropdownMenu>
  );

  it('renders ul with dropdown-menu class', () => {
    render(simpleMenu);
    const node = screen.getByRole('menu');

    node.tagName.should.equal('UL');
    node.className.should.match(/\bdropdown-menu\b/);
  });

  it('has role="menu"', () => {
    render(simpleMenu);
    const node = screen.getByRole('menu');

    node.getAttribute('role').should.equal('menu');
  });

  it('has aria-labelledby=<id>', () => {
    render(
      <>
        <span id="herpa">Herpa</span>
        <DropdownMenu labelledBy="herpa" />
      </>
    );
    render(
      <>
        <span id="derpa">Derpa</span>
        <DropdownMenu labelledBy="derpa" />
      </>
    );
    const node1 = screen.getByLabelText('Herpa');
    const node2 = screen.getByLabelText('Derpa');

    node1.getAttribute('aria-labelledby').should.equal('herpa');
    node2.getAttribute('aria-labelledby').should.equal('derpa');
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
      <DropdownMenu onSelect={onSelect}>
        <MenuItem eventKey="1">Item 1</MenuItem>
        <MenuItem eventKey="2">Item 2</MenuItem>
        <MenuItem eventKey="3">Item 3</MenuItem>
        <MenuItem eventKey="4">Item 4</MenuItem>
      </DropdownMenu>
    );

    screen.getAllByRole('menuitem').forEach(item => {
      userEvent.click(item);
    });
  });

  it('does not pass onSelect to DOM node', () => {
    render(<DropdownMenu onSelect={() => {}} />);

    expect(document.querySelector('ul').getAttribute('onSelect')).to.be.null;
  });

  it('applies pull right', () => {
    render(
      <DropdownMenu pullRight>
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );
    const node = screen.getByRole('menu');

    node.className.should.match(/\bdropdown-menu-right\b/);
  });

  it('handles empty children', () => {
    render(
      <DropdownMenu pullRight>
        <MenuItem>Item</MenuItem>
        {false && <MenuItem>Item 2</MenuItem>}
      </DropdownMenu>
    );
  });

  describe('focusable state', () => {
    it('clicking anything outside the menu will request close', async () => {
      const requestClose = sinon.stub();
      render(
        <div>
          <button>Something to click</button>
          <DropdownMenu onClose={requestClose} open>
            <MenuItem>Item</MenuItem>
          </DropdownMenu>
        </div>
      );

      await userEvent.click(screen.getByText('Something to click'));

      requestClose.should.have.been.calledOnce;
      requestClose.getCall(0).args.length.should.equal(2);
    });

    describe('Keyboard Navigation', () => {
      it('sets focus on next menu item when the key "down" is pressed', async () => {
        render(simpleMenu);

        const items = screen.getAllByRole('menuitem');
        items.length.should.equal(4);
        items[0].focus();

        for (let i = 1; i < items.length; i++) {
          await userEvent.keyboard('{ArrowDown}');
          document.activeElement.should.equal(items[i]);
        }
      });

      it('with last item is focused when the key "down" is pressed first item gains focus', async () => {
        render(simpleMenu);

        const items = screen.getAllByRole('menuitem');
        items.length.should.equal(4);
        items[3].focus();

        await userEvent.keyboard('{ArrowDown}');
        document.activeElement.should.equal(items[0]);
      });

      it('sets focus on previous menu item when the key "up" is pressed', async () => {
        render(simpleMenu);

        const items = screen.getAllByRole('menuitem');
        items.length.should.equal(4);
        items[3].focus();

        for (let i = 2; i >= 0; i--) {
          await userEvent.keyboard('{ArrowUp}');
          document.activeElement.should.equal(items[i]);
        }
      });

      it('with first item focused when the key "up" is pressed last item gains focus', async () => {
        render(simpleMenu);

        const items = screen.getAllByRole('menuitem');
        items.length.should.equal(4);
        items[0].focus();

        await userEvent.keyboard('{ArrowUp}');
        document.activeElement.should.equal(items[3]);
      });

      ['Escape', 'Tab'].forEach(key => {
        it(`when the key "${key}" is pressed the requestClose prop is invoked with the originating event`, async () => {
          const requestClose = sinon.spy();
          render(
            <DropdownMenu onClose={requestClose}>
              <MenuItem>Item</MenuItem>
            </DropdownMenu>
          );

          const item = screen.getByRole('menuitem');
          item.focus();

          await userEvent.keyboard(`{${key}}`);

          requestClose.should.have.been.calledOnce;
          requestClose.getCall(0).args[0].key.should.equal(key);
        });
      });
    });
  });

  it('Should pass props to dropdown', () => {
    render(
      <DropdownMenu className="new-fancy-class">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownMenu>
    );

    const node = screen.getByRole('menu');
    assert.ok(node.className.match(/\bnew-fancy-class\b/));
  });
});
