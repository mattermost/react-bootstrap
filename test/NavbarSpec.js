import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavItem from '../src/NavItem';

import { addStyle } from '../src/utils/bootstrapUtils';

import { getOne } from './helpers';

describe('<Navbar>', () => {
  it('Should create nav element', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');
    assert.equal(nav.nodeName, 'NAV');
    assert.ok(nav.className.match(/\bnavbar\b/));
    assert.notOk(nav.getAttribute('role'));
  });

  it('Should add "navigation" role when not using a `<nav>`', () => {
    render(<Navbar componentClass="div" />);
    const nav = screen.getByRole('navigation');
    assert.equal(nav.nodeName, 'DIV');
    assert.ok(nav.getAttribute('role') === 'navigation');
  });

  it('Should add fixedTop variation class', () => {
    render(<Navbar fixedTop />);
    assert.ok(
      screen.getByRole('navigation').classList.contains('navbar-fixed-top')
    );
  });

  it('Should add fixedBottom variation class', () => {
    render(<Navbar fixedBottom />);
    assert.ok(
      screen.getByRole('navigation').classList.contains('navbar-fixed-bottom')
    );
  });

  it('Should add staticTop variation class', () => {
    render(<Navbar staticTop />);
    assert.ok(
      screen.getByRole('navigation').classList.contains('navbar-static-top')
    );
  });

  it('Should add inverse variation class', () => {
    render(<Navbar inverse />);
    assert.ok(
      screen.getByRole('navigation').classList.contains('navbar-inverse')
    );
  });

  it('Should not add default class along with custom styles', () => {
    addStyle(Navbar, 'custom');

    render(<Navbar bsStyle="custom" />);

    assert.notOk(
      screen.getByRole('navigation').classList.contains('navbar-default')
    );
  });

  it('Should add fluid variation class', () => {
    render(<Navbar fluid />);

    assert.ok(
      screen
        .getByRole('navigation')
        .firstElementChild.classList.contains('container-fluid')
    );
  });

  it('Should override role attribute', () => {
    render(<Navbar role="banner" />);
    assert.notOk(screen.queryByRole('navigation'));
    assert.ok(screen.getByRole('banner'));
  });

  it('Should override node class', () => {
    render(<Navbar componentClass="header" />);
    assert.equal(screen.getByRole('navigation').nodeName, 'HEADER');
  });

  it('Should add header with brand', () => {
    render(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>Brand</Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    const header = document.querySelector('.navbar-header');

    const brand = getOne(header.getElementsByClassName('navbar-brand'));

    assert.ok(brand);
    assert.equal(brand.nodeName, 'SPAN');
    assert.equal(brand.textContent, 'Brand');
  });

  it('Should add link element with navbar-brand class using NavBrand Component', () => {
    render(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Brand</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    const brand = document.querySelector('.navbar-brand');

    assert.ok(brand);
    assert.equal(brand.nodeName, 'A');
    assert.equal(brand.textContent, 'Brand');
  });

  it('Should pass navbar context to navs', () => {
    render(
      <Navbar bsClass="my-navbar">
        <Nav />
      </Navbar>
    );

    const nav = document.querySelector('.nav');

    assert.ok(nav.classList.contains('my-navbar-nav'));
  });

  it('Should add default toggle', () => {
    render(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );

    screen.getByRole('button', { name: 'Toggle navigation' });
  });

  it('Should add custom toggle', () => {
    render(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle>
            <span className="test">hi</span>
          </Navbar.Toggle>
        </Navbar.Header>
      </Navbar>
    );

    screen.getByRole('button', { name: 'hi' });
  });

  it('Should trigger onToggle', async () => {
    const toggleSpy = sinon.spy();
    render(
      <Navbar onToggle={toggleSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );

    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });

    await userEvent.click(toggle);

    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(true);
  });

  it('Should support custom props', async () => {
    const clickSpy = sinon.spy();

    render(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle
            onClick={clickSpy}
            className="foo bar"
            style={{ height: 100 }}
          />
        </Navbar.Header>
      </Navbar>
    );

    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });

    expect(toggle.className).to.match(/foo bar/);
    expect(toggle.style.height).to.equal('100px');

    await userEvent.click(toggle);
    expect(clickSpy).to.have.been.called;
  });

  it('Should render collapse', () => {
    render(
      <Navbar>
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>
    );

    expect(screen.getByText('hello').className).to.match(/navbar-collapse/);
  });

  it('Should pass expanded to Collapse', () => {
    render(
      <Navbar defaultExpanded>
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>
    );

    expect(screen.getByText('hello').className).to.match(/\bin\b/);
  });

  it('Should wire the toggle to the collapse', async () => {
    render(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>hello</Navbar.Collapse>
      </Navbar>
    );

    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
    const collapse = screen.getByText('hello');

    await waitFor(() => {
      expect(collapse.className).to.not.match(/\bin\b/);
      expect(toggle.className).to.match(/collapsed/);
    });

    await userEvent.click(toggle);

    await waitFor(() => {
      expect(collapse.className).to.match(/\bin\b/);
      expect(toggle.className).to.not.match(/collapsed/);
    });
  });

  it('Should open external href link in collapseOnSelect', async () => {
    const selectSpy = sinon.spy();
    const navItemOnClick = sinon.stub();
    render(
      <Navbar onSelect={selectSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              eventKey={1}
              href="https://www.google.com"
              target="_blank"
              onClick={navItemOnClick}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = screen.getByRole('link');

    await userEvent.click(link);

    const event = navItemOnClick.getCall(0).args[0];
    const preventDefaultSpy = sinon.spy(event.preventDefault);

    expect(selectSpy).to.be.calledOnce;
    expect(navItemOnClick).to.be.calledOnce;
    expect(event.target.getAttribute('href')).to.be.equal(
      'https://www.google.com'
    );
    expect(preventDefaultSpy).to.not.be.called;
  });

  it('Should fire external href click', async () => {
    const navItemSpy = sinon.spy();
    render(
      <Navbar defaultExpanded>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              eventKey={1}
              href="https://www.google.com"
              target="_blank"
              onClick={navItemSpy}
            >
              <span className="link-text">Option 1</span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = screen.getByRole('link', { name: 'Option 1' });

    await userEvent.click(link);

    expect(navItemSpy.getCall(0).args[0].isDefaultPrevented()).to.be.false;
  });

  it('Should collapseOnSelect & fire Nav subcomponent onSelect event if expanded', async () => {
    const toggleSpy = sinon.spy();
    const navItemSpy = sinon.spy();
    render(
      <Navbar collapseOnSelect onToggle={toggleSpy} defaultExpanded>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={navItemSpy}>
              <span className="link-text">Option 1</span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = screen.getByRole('button', { name: 'Option 1' });

    await userEvent.click(link);

    expect(navItemSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(false);
  });

  it('Should fire onSelect with eventKey for nav children', async () => {
    const selectSpy = sinon.spy();
    const navItemSpy = sinon.spy();
    render(
      <Navbar onSelect={selectSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={navItemSpy}>
              <span className="onselect-text">Option 1</span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = screen.getByRole('button', { name: 'Option 1' });

    await userEvent.click(link);

    expect(navItemSpy).to.be.calledOnce;
    expect(selectSpy).to.be.calledOnce;
    expect(selectSpy).to.be.calledWith(1);
  });

  it('Should pass `bsClass` down to sub components', () => {
    render(
      <Navbar bsClass="my-navbar">
        <Navbar.Header>
          <Navbar.Brand />
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form />
          <Navbar.Text />
          <Navbar.Link />
          <Nav pullRight />
        </Navbar.Collapse>
      </Navbar>
    );

    assert.ok(document.querySelector('.my-navbar'));
    assert.ok(document.querySelector('.my-navbar-header'));
    assert.ok(document.querySelector('.my-navbar-toggle'));
    assert.ok(document.querySelector('.my-navbar-text'));
    assert.ok(document.querySelector('.my-navbar-link'));
    assert.ok(document.querySelector('.my-navbar-form'));
    assert.ok(document.querySelector('.my-navbar-collapse'));
    assert.ok(document.querySelector('.my-navbar-nav'));
    assert.ok(document.querySelector('.my-navbar-right'));
  });

  it('Should add custom className to header', () => {
    render(
      <Navbar>
        <Navbar.Header className="test">
          <Navbar.Brand />
        </Navbar.Header>
      </Navbar>
    );

    assert.ok(document.querySelector('.test'));
  });
});
