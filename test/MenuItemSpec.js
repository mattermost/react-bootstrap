import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import MenuItem from '../src/MenuItem';

import { shouldWarn } from './helpers';

describe('<MenuItem>', () => {
  it('renders divider', () => {
    render(<MenuItem divider />);
    const node = screen.getByRole('separator');

    node.className.should.match(/\bdivider\b/);
    node.getAttribute('role').should.equal('separator');
  });

  it('renders divider className and style', () => {
    render(
      <MenuItem divider className="foo bar" style={{ height: '100px' }} />
    );
    const node = screen.getByRole('separator');

    node.className.should.match(/\bfoo bar divider\b/);
    node.style.height.should.equal('100px');
  });

  it('renders divider not children', () => {
    shouldWarn('Children will not be rendered for dividers');

    render(<MenuItem divider>Some child</MenuItem>);
    const node = screen.getByRole('separator');

    node.className.should.match(/\bdivider\b/);
    node.innerHTML.should.not.match(/Some child/);
  });

  it('renders header', () => {
    render(<MenuItem header>Header Text</MenuItem>);
    const node = screen.getByRole('heading');

    node.className.should.match(/\bdropdown-header\b/);
    node.getAttribute('role').should.equal('heading');
    node.innerHTML.should.match(/Header Text/);
  });

  it('renders header className and style', () => {
    render(
      <MenuItem header className="foo bar" style={{ height: '100px' }}>
        Header Text
      </MenuItem>
    );
    const node = screen.getByRole('heading');

    node.className.should.match(/\bfoo bar dropdown-header\b/);
    node.style.height.should.equal('100px');
  });

  it('renders menu item link', done => {
    render(
      <MenuItem onKeyDown={() => done()} href="/herpa-derpa">
        Item
      </MenuItem>
    );

    const node = document.querySelector('li');
    const anchor = screen.getByRole('menuitem', { name: 'Item' });

    node.getAttribute('role').should.equal('presentation');
    anchor.getAttribute('role').should.equal('menuitem');
    anchor.getAttribute('tabIndex').should.equal('-1');
    anchor.getAttribute('href').should.equal('/herpa-derpa');

    anchor.innerHTML.should.match(/Item/);

    anchor.focus();
    userEvent.keyboard('{Space}');
  });

  it('click handling with onSelect prop', () => {
    const handleSelect = eventKey => {
      eventKey.should.equal('1');
    };
    render(
      <MenuItem onSelect={handleSelect} eventKey="1">
        Item
      </MenuItem>
    );
    const anchor = screen.getByRole('menuitem', { name: 'Item' });

    userEvent.click(anchor);
  });

  it('click handling with onSelect prop (no eventKey)', () => {
    const handleSelect = eventKey => {
      expect(eventKey).to.be.undefined;
    };
    render(<MenuItem onSelect={handleSelect}>Item</MenuItem>);
    const anchor = screen.getByRole('menuitem', { name: 'Item' });

    userEvent.click(anchor);
  });

  it('should call custom onClick', async () => {
    const handleClick = sinon.spy();
    const handleSelect = sinon.spy();

    render(
      <MenuItem onClick={handleClick} onSelect={handleSelect}>
        Item
      </MenuItem>
    );
    const anchor = screen.getByRole('menuitem', { name: 'Item' });

    await userEvent.click(anchor);

    expect(handleClick).to.have.been.called;
    expect(handleSelect).to.have.been.called;
  });

  it('does not fire onSelect when divider is clicked', async () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect with divider flag applied');
    };
    render(<MenuItem onSelect={handleSelect} divider />);
    document.querySelectorAll('a').length.should.equal(0);
    const li = document.querySelector('li');

    await userEvent.click(li);
  });

  it('does not fire onSelect when header is clicked', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect with divider flag applied');
    };
    render(
      <MenuItem onSelect={handleSelect} header>
        Header content
      </MenuItem>
    );
    document.querySelectorAll('a').length.should.equal(0);
    const li = document.querySelector('li');

    userEvent.click(li);
  });

  it('does not pass onClick to DOM node', () => {
    const { container } = render(<MenuItem onSelect={() => {}}>Item</MenuItem>);
    const anchor = container.querySelector('a');

    assert.equal(anchor.getAttribute('onselect'), null);
  });

  it('does not pass onClick to children', () => {
    const { container } = render(<MenuItem onSelect={() => {}}>Item</MenuItem>);
    const anchor = container.querySelector('a');

    assert.equal(anchor.getAttribute('onselect'), null);
  });

  it('disabled link', async () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect event');
    };
    render(
      <MenuItem onSelect={handleSelect} disabled>
        Text
      </MenuItem>
    );
    const node = document.querySelector('li');
    const anchor = screen.getByRole('menuitem', { name: 'Text' });

    node.className.should.match(/\bdisabled\b/);

    await userEvent.click(anchor);
  });

  it('should pass through props', () => {
    render(
      <MenuItem
        className="test-class"
        href="#hi-mom!"
        title="hi mom!"
        style={{ height: 100 }}
      >
        Title
      </MenuItem>
    );

    let node = document.querySelector('li');

    assert(node.className.match(/\btest-class\b/));
    assert.equal(node.style.height, '100px');
    assert.equal(node.getAttribute('href'), null);
    assert.equal(node.getAttribute('title'), null);

    let anchorNode = node.firstElementChild;

    assert.notOk(anchorNode.className.match(/\btest-class\b/));
    assert.equal(anchorNode.getAttribute('href'), '#hi-mom!');
    assert.equal(anchorNode.getAttribute('title'), 'hi mom!');
  });

  it('Should set target attribute on anchor', () => {
    render(<MenuItem target="_blank">Title</MenuItem>);

    let anchor = screen.getByRole('menuitem', { name: 'Title' });
    assert.equal(anchor.getAttribute('target'), '_blank');
  });

  it('should output an li', () => {
    render(<MenuItem>Title</MenuItem>);
    assert.equal(document.querySelector('li').nodeName, 'LI');
    assert.equal(
      document.querySelector('li').getAttribute('role'),
      'presentation'
    );
  });
});
