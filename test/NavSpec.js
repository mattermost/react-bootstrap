import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Nav from '../src/Nav';
import NavItem from '../src/NavItem';

import { shouldWarn } from './helpers';

describe('<Nav>', () => {
  let mountPoint;
  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  afterEach(() => {
    document.body.removeChild(mountPoint);
  });

  it('Should set the correct item active', () => {
    render(
      <Nav bsStyle="pills" activeKey={1}>
        <NavItem eventKey={1}>Pill 1 content</NavItem>
        <NavItem eventKey={2}>Pill 2 content</NavItem>
      </Nav>
    );

    const items = document.querySelector('.nav').children;

    assert.ok(items[0].classList.contains('active'));
    assert.notOk(items[1].classList.contains('active'));
  });

  it('Should adds style class', () => {
    render(
      <Nav bsStyle="tabs" activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(document.querySelector('.nav').classList.contains('nav-tabs'));
  });

  it('Should adds stacked variation class', () => {
    render(
      <Nav bsStyle="tabs" stacked activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(document.querySelector('.nav').classList.contains('nav-stacked'));
  });

  it('Should adds variation class', () => {
    render(
      <Nav bsStyle="tabs" justified activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(
      document.querySelector('.nav').classList.contains('nav-justified')
    );
  });

  it('Should add pull-right class', () => {
    render(
      <Nav bsStyle="tabs" pullRight activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(document.querySelector('.nav').classList.contains('pull-right'));
  });

  it('Should add navbar-right class', () => {
    render(
      <Nav bsStyle="tabs" navbar pullRight activeKey={1}>
        <NavItem key={1}>Tab 1 content</NavItem>
        <NavItem key={2}>Tab 2 content</NavItem>
      </Nav>
    );

    assert.ok(
      document.querySelector('.nav').classList.contains('navbar-right')
    );
  });

  it('Should call on select when item is selected', done => {
    function handleSelect(key) {
      assert.equal(key, '2');
      done();
    }
    render(
      <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>
          <span>Tab 2 content</span>
        </NavItem>
      </Nav>
    );

    userEvent.click(screen.getByText('Tab 2 content'));
  });

  it('Should set the correct item active by href', () => {
    render(
      <Nav bsStyle="pills" activeHref="#item2">
        <NavItem eventKey={1} href="#item1">
          Pill 1 content
        </NavItem>
        <NavItem eventKey={2} href="#item2">
          Pill 2 content
        </NavItem>
      </Nav>
    );

    assert.ok(
      screen
        .getByText('Pill 2 content')
        .parentElement.classList.contains('active')
    );
    assert.notOk(
      screen
        .getByText('Pill 1 content')
        .parentElement.classList.contains('active')
    );
  });

  it('Should warn when attempting to use a justified navbar nav', () => {
    shouldWarn('justified navbar `Nav`s are not supported');

    render(<Nav navbar justified />);
  });

  describe('keyboard navigation', () => {
    // Renders a `<Nav>` wrapped in a controlled parent, mirroring the way a
    // real consumer updates `activeKey` in response to `onSelect`. `state`
    // exposes the current `activeKey` and a setter so tests can drive and
    // observe it in place of enzyme's `instance.prop`/`setProps`.
    function renderNav(startKey = 1) {
      const state = { setActiveKey: null, activeKey: startKey };
      const selectSpy = sinon.spy(activeKey => state.setActiveKey(activeKey));

      function ControlledNav() {
        const [activeKey, setActiveKey] = React.useState(startKey);
        state.setActiveKey = setActiveKey;
        state.activeKey = activeKey;

        return (
          <Nav activeKey={activeKey} onSelect={selectSpy} role="tablist">
            <NavItem eventKey={1}>NavItem 1 content</NavItem>
            <NavItem eventKey={2} disabled>
              NavItem 2 content
            </NavItem>
            <NavItem eventKey={3}>NavItem 3 content</NavItem>
            <NavItem eventKey={4} disabled>
              NavItem 4 content
            </NavItem>
            <NavItem eventKey={5}>NavItem 5 content</NavItem>
          </Nav>
        );
      }

      const { container } = render(<ControlledNav />);
      return { container, selectSpy, state };
    }

    it('only the active tab should be focusable', () => {
      const { container } = renderNav();
      const links = Array.from(container.querySelectorAll('a'));

      expect(links[0].getAttribute('tabindex')).to.not.equal('-1');
      expect(links[1].getAttribute('tabindex')).to.equal('-1');
      expect(links[2].getAttribute('tabindex')).to.equal('-1');
      expect(links[3].getAttribute('tabindex')).to.equal('-1');
      expect(links[4].getAttribute('tabindex')).to.equal('-1');
    });

    it('should focus the next tab on arrow key', () => {
      const { container, state } = renderNav();
      const anchors = Array.from(container.querySelectorAll('a'));
      anchors[0].focus();

      fireEvent.keyDown(anchors[0], { key: 'ArrowRight' });

      expect(state.activeKey).to.equal(3);
      expect(document.activeElement).to.equal(anchors[2]);
    });

    it('should focus the previous tab on arrow key', () => {
      const { container, state } = renderNav();
      act(() => state.setActiveKey(5));

      const anchors = Array.from(container.querySelectorAll('a'));
      anchors[4].focus();

      fireEvent.keyDown(anchors[4], { key: 'ArrowLeft' });

      expect(state.activeKey).to.equal(3);
      expect(document.activeElement).to.equal(anchors[2]);
    });

    it('should wrap to the next tab on arrow key', () => {
      const { container, state } = renderNav();
      act(() => state.setActiveKey(5));

      const anchors = Array.from(container.querySelectorAll('a'));
      anchors[4].focus();

      fireEvent.keyDown(anchors[4], { key: 'ArrowDown' });

      expect(state.activeKey).to.equal(1);
      expect(document.activeElement).to.equal(anchors[0]);
    });

    it('should wrap to the previous tab on arrow key', () => {
      const { container, state } = renderNav();
      const anchors = Array.from(container.querySelectorAll('a'));
      anchors[0].focus();

      fireEvent.keyDown(anchors[0], { key: 'ArrowUp' });

      expect(state.activeKey).to.equal(5);
      expect(document.activeElement).to.equal(anchors[4]);
    });
  });

  describe('event keys', () => {
    function renderNav(startKey, items) {
      const state = { setActiveKey: null, activeKey: startKey };
      const selectSpy = sinon.spy(activeKey => state.setActiveKey(activeKey));

      function ControlledNav() {
        const [activeKey, setActiveKey] = React.useState(startKey);
        state.setActiveKey = setActiveKey;
        state.activeKey = activeKey;

        return (
          <Nav activeKey={activeKey} onSelect={selectSpy} role="tablist">
            {items.map(eventKey => (
              <NavItem key={String(eventKey)} eventKey={eventKey}>
                NavItem {String(eventKey)} content
              </NavItem>
            ))}
          </Nav>
        );
      }

      const { container } = render(<ControlledNav />);
      return { container, selectSpy, state };
    }

    it('should accept any number as an event key', () => {
      const { container, state } = renderNav(-100, [-100, 0, 1]);

      const anchors = Array.from(container.querySelectorAll('a'));
      anchors[0].focus();

      fireEvent.keyDown(anchors[0], { key: 'ArrowRight' });

      expect(state.activeKey).to.equal(0);
      expect(document.activeElement).to.equal(anchors[1]);
    });

    it('should accept any string as an event key', () => {
      const { container, state } = renderNav('', ['a', 'b', '']);

      const anchors = Array.from(container.querySelectorAll('a'));
      anchors[2].focus();

      fireEvent.keyDown(anchors[2], { key: 'ArrowRight' });

      expect(state.activeKey).to.equal('a');
      expect(document.activeElement).to.equal(anchors[0]);
    });
  });

  describe('Web Accessibility', () => {
    it('Should have tablist and tab roles', () => {
      render(
        <Nav role="tablist" bsStyle="tabs" activeKey={1}>
          <NavItem key={1}>Tab 1 content</NavItem>
          <NavItem key={2}>Tab 2 content</NavItem>
        </Nav>
      );

      const ul = document.querySelector('ul');
      const navItem = screen.getByText('Tab 1 content');

      assert.equal(ul.getAttribute('role'), 'tablist');
      assert.equal(navItem.getAttribute('role'), 'tab');
    });
  });
});
