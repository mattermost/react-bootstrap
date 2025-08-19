import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mount } from 'enzyme';

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
    let instance;
    let selectSpy;

    beforeEach(() => {
      instance = mount(
        <Nav activeKey={1} onSelect={selectSpy} role="tablist">
          <NavItem eventKey={1}>NavItem 1 content</NavItem>
          <NavItem eventKey={2} disabled>
            NavItem 2 content
          </NavItem>
          <NavItem eventKey={3}>NavItem 3 content</NavItem>
          <NavItem eventKey={4} disabled>
            NavItem 4 content
          </NavItem>
          <NavItem eventKey={5}>NavItem 5 content</NavItem>
        </Nav>,
        { attachTo: mountPoint }
      );

      selectSpy = sinon.spy(activeKey => instance.setProps({ activeKey }));
    });

    afterEach(() => instance.unmount());

    it('only the active tab should be focusable', () => {
      const links = instance.find('a').map(n => n.getDOMNode());

      expect(links[0].getAttribute('tabindex')).to.not.equal('-1');
      expect(links[1].getAttribute('tabindex')).to.equal('-1');
      expect(links[2].getAttribute('tabindex')).to.equal('-1');
      expect(links[3].getAttribute('tabindex')).to.equal('-1');
      expect(links[4].getAttribute('tabindex')).to.equal('-1');
    });

    it('should focus the next tab on arrow key', () => {
      const anchors = instance.find('a');
      anchors
        .at(0)
        .getDOMNode()
        .focus();

      anchors.at(0).simulate('keydown', {
        key: 'ArrowRight'
      });

      expect(instance.prop('activeKey')).to.equal(3);

      expect(document.activeElement).to.equal(anchors.at(2).getDOMNode());
    });

    it('should focus the previous tab on arrow key', () => {
      instance.setProps({ activeKey: 5 });

      const anchors = instance.find('a');
      anchors
        .at(4)
        .getDOMNode()
        .focus();

      anchors.at(4).simulate('keydown', { key: 'ArrowLeft' });

      expect(instance.props().activeKey).to.equal(3);
      expect(document.activeElement).to.equal(anchors.at(2).getDOMNode());
    });

    it('should wrap to the next tab on arrow key', () => {
      instance.setProps({ activeKey: 5 });

      const anchors = instance.find('a');
      anchors
        .at(4)
        .getDOMNode()
        .focus();

      anchors.at(4).simulate('keydown', { key: 'ArrowDown' });

      expect(instance.props().activeKey).to.equal(1);
      expect(document.activeElement).to.equal(anchors.at(0).getDOMNode());
    });

    it('should wrap to the previous tab on arrow key', () => {
      const anchors = instance.find('a');
      anchors
        .at(0)
        .getDOMNode()
        .focus();

      anchors.at(0).simulate('keydown', { key: 'ArrowUp' });

      expect(instance.props().activeKey).to.equal(5);
      expect(document.activeElement).to.equal(anchors.at(4).getDOMNode());
    });
  });

  describe('event keys', () => {
    it('should accept any number as an event key', () => {
      let instance;
      let selectSpy = sinon.spy(activeKey => instance.setProps({ activeKey }));
      instance = mount(
        <Nav activeKey={-100} onSelect={selectSpy} role="tablist">
          <NavItem eventKey={-100}>NavItem 1 content</NavItem>
          <NavItem eventKey={0}>NavItem 2 content</NavItem>
          <NavItem eventKey={1}>NavItem 3 content</NavItem>
        </Nav>,
        { attachTo: mountPoint }
      );

      const anchors = instance.find('a');
      anchors
        .at(0)
        .getDOMNode()
        .focus();

      anchors.at(0).simulate('keydown', {
        key: 'ArrowRight'
      });

      expect(instance.props().activeKey).to.equal(0);
      expect(document.activeElement).to.equal(anchors.at(1).getDOMNode());

      instance.unmount();
    });

    it('should accept any string as an event key', () => {
      let instance;
      let selectSpy = sinon.spy(activeKey => instance.setProps({ activeKey }));
      instance = mount(
        <Nav activeKey="" onSelect={selectSpy} role="tablist">
          <NavItem eventKey="a">NavItem 1 content</NavItem>
          <NavItem eventKey="b">NavItem 2 content</NavItem>
          <NavItem eventKey="">NavItem 3 content</NavItem>
        </Nav>,
        { attachTo: mountPoint }
      );

      const anchors = instance.find('a');
      anchors
        .at(2)
        .getDOMNode()
        .focus();

      anchors.at(2).simulate('keydown', {
        key: 'ArrowRight'
      });

      expect(instance.props().activeKey).to.equal('a');
      expect(document.activeElement).to.equal(anchors.at(0).getDOMNode());

      instance.unmount();
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
