import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import SplitButton from '../src/SplitButton';
import MenuItem from '../src/MenuItem';

describe('<SplitButton>', () => {
  const simple = (
    <SplitButton title="Title" id="test-id">
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </SplitButton>
  );

  it('should open the menu when dropdown button is clicked', async () => {
    render(simple);
    const toggleNode = screen.getAllByRole('button', { name: 'Title' })[1];
    const splitButtonNode = document.querySelector('.dropdown');

    splitButtonNode.className.should.not.match(/open/);
    await userEvent.click(toggleNode);
    splitButtonNode.className.should.match(/open/);
  });

  it('should not open the menu when other button is clicked', async () => {
    render(simple);

    const buttonNode = screen.getAllByRole('button', { name: 'Title' })[0];
    const splitButtonNode = document.querySelector('.dropdown');

    splitButtonNode.className.should.not.match(/open/);
    await userEvent.click(buttonNode);
    splitButtonNode.className.should.not.match(/open/);
  });

  it('should invoke onClick when SplitButton.Button is clicked (prop)', done => {
    render(
      <SplitButton title="Title" id="test-id" onClick={() => done()}>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const buttonNode = screen.getAllByRole('button', { name: 'Title' })[0];
    userEvent.click(buttonNode);
  });

  it('should not invoke onClick when SplitButton.Toggle is clicked (prop)', done => {
    let onClickSpy = sinon.spy();

    render(
      <SplitButton title="Title" id="test-id" onClick={onClickSpy}>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const toggleNode = screen.getAllByRole('button', { name: 'Title' })[1];

    userEvent.click(toggleNode);

    setTimeout(() => {
      onClickSpy.should.not.have.been.called;
      done();
    }, 10);
  });

  it('Should pass disabled to both buttons', () => {
    render(
      <SplitButton title="Title" id="test-id" disabled>
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const toggleNode = screen.getAllByRole('button', { name: 'Title' })[1];

    const buttonNode = screen.getAllByRole('button', { name: 'Title' })[0];

    expect(toggleNode.disabled).to.be.true;
    expect(buttonNode.disabled).to.be.true;
  });

  it('Should set target attribute on anchor', () => {
    render(
      <SplitButton
        title="Title"
        id="test-id"
        href="/some/unique-thing/"
        target="_blank"
      >
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </SplitButton>
    );

    let anchors = screen.getAllByRole('link');
    let linkElement = anchors[0];

    assert.equal(linkElement.target, '_blank');
  });

  it('should set aria-label on toggle from title', () => {
    render(simple);

    const toggleNode = screen.getAllByRole('button', { name: 'Title' })[1];
    expect(toggleNode.getAttribute('aria-label')).to.equal('Title');
  });

  it('should set aria-label on toggle from toggleLabel', () => {
    render(
      <SplitButton title="Title" id="test-id" toggleLabel="Label">
        <MenuItem>Item 1</MenuItem>
      </SplitButton>
    );

    const toggleNode = screen.getByRole('button', { name: 'Label' });
    expect(toggleNode.getAttribute('aria-label')).to.equal('Label');
  });

  it('should derive bsClass from parent', () => {
    render(
      <SplitButton title="title" id="test-id" bsClass="my-dropdown">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </SplitButton>
    );

    assert.ok(document.querySelector('.my-dropdown-toggle'));
    assert.ok(document.querySelector('.my-dropdown-menu'));
  });
});
