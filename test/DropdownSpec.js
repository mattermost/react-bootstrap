import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Dropdown from '../src/Dropdown';
import Grid from '../src/Grid';
import MenuItem from '../src/MenuItem';
import { getDuplicateRoleError } from '../src/utils/PropTypes';

import { shouldWarn } from './helpers';

class CustomMenu extends React.Component {
  render() {
    return <div className="custom-menu">{this.props.children}</div>;
  }
}

describe('<Dropdown>', () => {
  const dropdownChildren = [
    <Dropdown.Toggle key="toggle">Child Title</Dropdown.Toggle>,
    <Dropdown.Menu key="menu">
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </Dropdown.Menu>
  ];

  const simpleDropdown = <Dropdown id="test-id">{dropdownChildren}</Dropdown>;

  it('renders div with dropdown class', () => {
    render(simpleDropdown);
    const node = document.querySelector('.btn-group');

    node.tagName.should.equal('DIV');
    node.className.should.match(/\bdropdown\b/);
    node.className.should.not.match(/\bdropup\b/);
  });

  it('renders div with dropup class', () => {
    render(
      <Dropdown title="Dropup" dropup id="test-id">
        {dropdownChildren}
      </Dropdown>
    );
    const node = document.querySelector('.btn-group');

    node.tagName.should.equal('DIV');
    node.className.should.not.match(/\bdropdown\b/);
    node.className.should.match(/\bdropup\b/);
  });

  it('renders toggle with Dropdown.Toggle', () => {
    render(simpleDropdown);

    const buttonNode = screen.getByRole('button');

    buttonNode.textContent.should.match(/Child Title/);

    buttonNode.tagName.should.equal('BUTTON');
    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('type').should.equal('button');
    buttonNode.getAttribute('aria-expanded').should.equal('false');
    buttonNode.getAttribute('id').should.be.ok;
  });

  it('renders dropdown toggle button caret', () => {
    render(simpleDropdown);
    const caretNode = document.querySelector('.caret');

    caretNode.tagName.should.equal('SPAN');
  });

  it('does not render toggle button caret', () => {
    render(<Dropdown.Toggle noCaret>Child Text</Dropdown.Toggle>);
    const caretNode = document.querySelectorAll('.caret');

    caretNode.length.should.equal(0);
  });

  it('renders custom menu', () => {
    render(
      <Dropdown title="Single child" id="test-id">
        <Dropdown.Toggle>Child Text</Dropdown.Toggle>

        <CustomMenu bsRole="menu">
          <MenuItem>Item 1</MenuItem>
        </CustomMenu>
      </Dropdown>
    );

    document.querySelectorAll('.dropdown-menu').length.should.equal(0);
    document.querySelectorAll('.custom-menu').length.should.equal(1);
  });

  it('prop validation with multiple menus', () => {
    const props = {
      title: 'herpa derpa',
      children: [
        <Dropdown.Toggle>Child Text</Dropdown.Toggle>,
        <Dropdown.Menu>
          <MenuItem>Item 1</MenuItem>
        </Dropdown.Menu>,
        <Dropdown.Menu>
          <MenuItem>Item 1</MenuItem>
        </Dropdown.Menu>
      ]
    };

    const err = getDuplicateRoleError('DropdownButton', props.children, 'menu');
    err.should.match(/Duplicate children.*bsRole: menu/);
  });

  it('forwards pullRight to menu', () => {
    render(
      <Dropdown pullRight id="test-id">
        {dropdownChildren}
      </Dropdown>
    );
    const node = screen.getByRole('menu');

    node.className.should.match(/\bdropdown-menu-right\b/);
  });

  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', async () => {
    render(simpleDropdown);
    const node = document.querySelector('.dropdown');
    const buttonNode = screen.getByRole('button');

    node.className.should.not.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');

    await userEvent.click(buttonNode);

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');

    await userEvent.click(buttonNode);

    node.className.should.not.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');
  });

  it('closes when clicked outside', async () => {
    render(simpleDropdown);
    const node = document.querySelector('.dropdown');
    const buttonNode = screen.getByRole('button');

    node.className.should.not.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');

    await userEvent.click(buttonNode);

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');

    // Use native events as the click doesn't have to be in the React portion
    act(() => {
      const event = new MouseEvent('click');
      document.dispatchEvent(event);
    });

    node.className.should.not.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');
  });

  it('closes when mousedown outside if rootCloseEvent set', async () => {
    render(
      <Dropdown id="test-id" rootCloseEvent="mousedown">
        {dropdownChildren}
      </Dropdown>
    );
    const node = document.querySelector('.dropdown');
    const buttonNode = screen.getByRole('button');

    node.className.should.not.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');

    await userEvent.click(buttonNode);

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');

    // Use native events as the click doesn't have to be in the React portion
    act(() => {
      const event = new MouseEvent('mousedown');
      document.dispatchEvent(event);
    });

    node.className.should.not.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');
  });

  it('opens if dropdown contains no focusable menu item', async () => {
    render(
      <Dropdown title="custom child" id="dropdown">
        <Dropdown.Toggle>Toggle</Dropdown.Toggle>
        <Dropdown.Menu>
          <li>Some custom nonfocusable content</li>
        </Dropdown.Menu>
      </Dropdown>
    );
    const node = document.querySelector('.dropdown');
    const buttonNode = screen.getByRole('button');
    await userEvent.click(buttonNode);
    node.className.should.match(/\bopen\b/);
  });

  it('when focused and closed toggles open when the key "down" is pressed', async () => {
    render(simpleDropdown);
    const node = document.querySelector('.dropdown');
    const buttonNode = screen.getByRole('button');

    buttonNode.focus();
    await userEvent.keyboard('{ArrowDown}');

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');
  });

  it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', () => {
    render(simpleDropdown);
    const buttonNode = screen.getByRole('button');

    buttonNode.getAttribute('aria-haspopup').should.equal('true');
  });

  it('does not pass onSelect to DOM node', () => {
    render(simpleDropdown);

    expect(document.querySelector('div').getAttribute('onSelect')).to.be.null;
  });

  it('closes when child MenuItem is selected', async () => {
    render(simpleDropdown);

    const node = document.querySelector('.dropdown');

    const buttonNode = screen.getByRole('button');
    await userEvent.click(buttonNode);
    node.className.should.match(/\bopen\b/);

    const menuItem = screen.getAllByRole('menuitem')[0];
    await userEvent.click(menuItem);
    node.className.should.not.match(/\bopen\b/);
  });

  it('does not close when onToggle is controlled', async () => {
    const handleSelect = () => {};

    render(
      <Dropdown open onToggle={handleSelect} id="test-id">
        {dropdownChildren}
      </Dropdown>
    );

    const node = document.querySelector('.dropdown');
    const buttonNode = screen.getByRole('button');

    const menuItem = screen.getAllByRole('menuitem')[0];

    await userEvent.click(buttonNode);
    node.className.should.match(/\bopen\b/);
    await userEvent.click(menuItem);

    node.className.should.match(/\bopen\b/);
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
            <Dropdown
              open={this.state.open}
              onToggle={() => {}}
              title="Prop open control"
              id="test-id"
            >
              {dropdownChildren}
            </Dropdown>
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

  it('has aria-labelledby same id as toggle button', () => {
    render(simpleDropdown);
    const node = document.querySelector('.dropdown');
    const buttonNode = screen.getByRole('button');
    const menuNode = node.children[1];

    buttonNode
      .getAttribute('id')
      .should.equal(menuNode.getAttribute('aria-labelledby'));
  });

  describe('PropType validation', () => {
    describe('children', () => {
      it('menu is exclusive', () => {
        shouldWarn('Duplicate children');
        shouldWarn('bsRole: menu');

        render(
          <Dropdown id="test">
            <Dropdown.Toggle />
            <Dropdown.Menu />
            <Dropdown.Menu />
          </Dropdown>
        );
      });

      it('menu is required', () => {
        shouldWarn('Missing a required child');
        shouldWarn('bsRole: menu');

        // Dropdowns can't render without a menu.
        try {
          render(
            <Dropdown id="test">
              <Dropdown.Toggle />
            </Dropdown>
          );
        } catch (e) {} // eslint-disable-line no-empty
      });

      it('toggles are not exclusive', () => {
        render(
          <Dropdown id="test">
            <Dropdown.Toggle />
            <Dropdown.Toggle />
            <Dropdown.Menu />
          </Dropdown>
        );
      });

      it('toggle is required', () => {
        shouldWarn('Missing a required child');
        shouldWarn('bsRole: toggle');

        render(
          <Dropdown id="test">
            <Dropdown.Menu />
          </Dropdown>
        );
      });
    });
  });

  it('chains refs', async () => {
    class RefDropdown extends React.Component {
      render() {
        return (
          <Dropdown
            ref={dropdown => {
              if (dropdown) {
                this.dropdown = dropdown.inner;
              }
            }}
            id="test"
          >
            <Dropdown.Toggle ref={toggle => (this.toggle = toggle)} />
            <Dropdown.Menu ref={menu => (this.menu = menu)} />
          </Dropdown>
        );
      }
    }

    let outerRef;
    render(<RefDropdown ref={element => (outerRef = element)} />);

    outerRef.menu.should.exist;
    outerRef.dropdown.menu.should.exist;

    outerRef.toggle.should.exist;
  });

  describe('focusable state', () => {
    it('when focused and closed sets focus on first menu item when the key "down" is pressed', async () => {
      render(simpleDropdown);
      const buttonNode = screen.getByRole('button');

      buttonNode.focus();

      await userEvent.keyboard('{ArrowDown}');

      const firstMenuItemAnchor = screen.getAllByRole('menuitem')[0];

      document.activeElement.should.equal(firstMenuItemAnchor);
    });

    it('when focused and open does not toggle closed when the key "down" is pressed', async () => {
      render(simpleDropdown);
      const node = document.querySelector('.dropdown');
      const buttonNode = screen.getByRole('button');

      await userEvent.click(buttonNode);
      await userEvent.keyboard('{ArrowDown}');

      node.className.should.match(/\bopen\b/);
      buttonNode.getAttribute('aria-expanded').should.equal('true');
    });

    // This test is more complicated then it appears to need. This is
    // because there was an intermittent failure of the test when not structured this way
    // The failure occured when all tests in the suite were run together, but not a subset of the tests.
    //
    // I am fairly confident that the failure is due to a test specific conflict and not an actual bug.
    it('when open and the key "esc" is pressed the menu is closed and focus is returned to the button', async () => {
      render(
        <Dropdown defaultOpen role="menuitem" id="test-id">
          {dropdownChildren}
        </Dropdown>
      );

      const buttonNode = screen.getByRole('button');
      const firstMenuItemAnchor = screen.getAllByRole('menuitem')[0];

      document.activeElement.should.equal(firstMenuItemAnchor);

      await userEvent.keyboard('{Escape}');

      document.activeElement.should.equal(buttonNode);
    });

    it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', () =>
      new Promise(async done => {
        render(
          <Grid>
            {simpleDropdown}
            <input type="text" id="next-focusable" />
          </Grid>
        );

        // Need to use Grid instead of div above to make instance a composite
        // element, to make this call legal.

        const buttonNode = screen.getByRole('button');

        await userEvent.click(buttonNode);
        buttonNode.getAttribute('aria-expanded').should.equal('true');

        await userEvent.keyboard('{Tab}');

        setTimeout(() => {
          buttonNode.getAttribute('aria-expanded').should.equal('false');
          done();
        });

        // simulating a tab event doesn't actually shift focus.
        // at least that seems to be the case according to SO.
        // hence no assert on the input having focus.
      }));
  });

  describe('DOM event and source passed to onToggle', () => {
    it('passes open, event, and source correctly when opened with click', async () => {
      const spy = sinon.spy();
      render(
        <Dropdown id="test-id" onToggle={spy}>
          {dropdownChildren}
        </Dropdown>
      );
      const buttonNode = screen.getByRole('button');

      expect(spy).to.not.have.been.called;

      await userEvent.click(buttonNode);

      expect(spy).to.have.been.calledOnce;
      expect(spy.getCall(0).args.length).to.equal(3);
      expect(spy.getCall(0).args[0]).to.equal(true);
      expect(spy.getCall(0).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(0).args[2], { source: 'click' });
    });

    it('passes open, event, and source correctly when closed with click', async () => {
      const spy = sinon.spy();
      render(
        <Dropdown id="test-id" onToggle={spy}>
          {dropdownChildren}
        </Dropdown>
      );
      const buttonNode = screen.getByRole('button');

      expect(spy).to.not.have.been.called;
      await userEvent.click(buttonNode);
      expect(spy).to.have.been.calledOnce;
      await userEvent.click(buttonNode);

      expect(spy).to.have.been.calledTwice;
      expect(spy.getCall(1).args.length).to.equal(3);
      expect(spy.getCall(1).args[0]).to.equal(false);
      expect(spy.getCall(1).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(1).args[2], { source: 'click' });
    });

    it('passes open, event, and source correctly when child selected', async () => {
      const spy = sinon.spy();
      render(
        <Dropdown id="test-id" onToggle={spy}>
          <Dropdown.Toggle key="toggle">Child Title</Dropdown.Toggle>
          <Dropdown.Menu key="menu">
            <MenuItem eventKey={1}>Item 1</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );
      const buttonNode = screen.getByRole('button');
      const childNode = screen.getByRole('menuitem');

      expect(spy).to.not.have.been.called;
      await userEvent.click(buttonNode);
      expect(spy).to.have.been.calledOnce;

      await userEvent.click(childNode);

      expect(spy).to.have.been.calledTwice;
      expect(spy.getCall(1).args.length).to.equal(3);
      expect(spy.getCall(1).args[0]).to.equal(false);
      expect(spy.getCall(1).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(1).args[2], { source: 'select' });
    });

    it('passes open, event, and source correctly when opened with keydown', async () => {
      const spy = sinon.spy();
      render(
        <Dropdown id="test-id" onToggle={spy}>
          {dropdownChildren}
        </Dropdown>
      );
      const buttonNode = screen.getByRole('button');
      buttonNode.focus();

      await userEvent.keyboard('{ArrowDown}');

      expect(spy).to.have.been.calledOnce;
      expect(spy.getCall(0).args.length).to.equal(3);
      expect(spy.getCall(0).args[0]).to.equal(true);
      expect(spy.getCall(0).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(0).args[2], { source: 'keydown' });
    });
  });

  it('should derive bsClass from parent', () => {
    render(
      <Dropdown bsClass="my-dropdown" id="test-id">
        <Dropdown.Toggle bsClass="my-toggle">Child Title</Dropdown.Toggle>
        <Dropdown.Menu bsClass="my-menu">
          <MenuItem>Item 1</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );

    assert.ok(document.querySelector('.my-dropdown-toggle'));
    assert.ok(document.querySelector('.my-dropdown-menu'));

    assert.lengthOf(document.querySelectorAll('.my-toggle'), 0);
    assert.lengthOf(document.querySelectorAll('.my-menu'), 0);
  });
});
