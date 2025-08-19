import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DropdownToggle from '../src/DropdownToggle';

import { getOne } from './helpers';

describe('<DropdownToggle>', () => {
  const simpleToggle = <DropdownToggle open={false} title="herpa derpa" />;

  it('renders toggle button', () => {
    render(simpleToggle);
    const buttonNode = screen.getByRole('button');

    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');
  });

  it('renders title prop', () => {
    render(simpleToggle);
    const buttonNode = screen.getByRole('button');

    buttonNode.textContent.should.match(/herpa derpa/);
  });

  it('renders title children', () => {
    render(
      <DropdownToggle title="toggle" open={false}>
        <h3>herpa derpa</h3>
      </DropdownToggle>
    );
    const button = screen.getByRole('button');
    const h3Node = getOne(button.getElementsByTagName('h3'));

    h3Node.textContent.should.match(/herpa derpa/);
  });

  it('renders dropdown toggle button caret', () => {
    render(simpleToggle);
    const caretNode = document.querySelector('.caret');

    caretNode.tagName.should.equal('SPAN');
  });

  it('does not render toggle button caret', () => {
    render(<DropdownToggle open={false} title="no caret" noCaret />);
    const caretNode = document.querySelectorAll('.caret');

    caretNode.length.should.equal(0);
  });

  it('forwards onClick handler', done => {
    const handleClick = event => {
      event.should.be.ok;
      done();
    };
    render(
      <DropdownToggle
        open={false}
        title="click forwards"
        onClick={handleClick}
      />
    );
    const button = screen.getByRole('button');

    userEvent.click(button);
  });

  it('forwards id', () => {
    const id = 'testid';
    render(<DropdownToggle id={id} open={false} title="id forwards" />);
    const button = screen.getByRole('button');

    button.getAttribute('id').should.equal(id);
  });

  it('forwards bsStyle', () => {
    const style = 'success';
    render(
      <DropdownToggle bsStyle={style} open={false} title="bsStyle forwards" />
    );
    const button = screen.getByRole('button');

    button.className.should.match(/\bbtn-success\b/);
  });

  it('forwards bsSize', () => {
    render(
      <DropdownToggle bsSize="small" open={false} title="bsSize forwards" />
    );
    const button = screen.getByRole('button');

    button.className.should.match(/\bbtn-sm\b/);
  });

  it('does not forward bsClass', () => {
    render(
      <DropdownToggle
        bsClass="my-custom-bsClass"
        open={false}
        title="bsClass"
      />
    );
    const button = screen.getByRole('button');

    button.className.should.match(/\bmy-custom-bsClass\b/);
    button.className.should.match(/\bbtn\b/);
  });
});
