import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Button from '../src/Button';

describe('<Button>', () => {
  it('Should output a button', () => {
    render(<Button>Title</Button>);
    assert.equal(screen.getByText('Title').nodeName, 'BUTTON');
  });

  it('Should have type=button by default', () => {
    render(<Button>Title</Button>);
    assert.equal(screen.getByText('Title').getAttribute('type'), 'button');
  });

  it('Should show the type if passed one', () => {
    render(<Button type="submit">Title</Button>);
    assert.equal(screen.getByText('Title').getAttribute('type'), 'submit');
  });

  it('Should output an anchor if called with a href', () => {
    let href = '/url';
    render(<Button href={href}>Title</Button>);
    assert.equal(screen.getByText('Title').nodeName, 'A');
    assert.equal(screen.getByText('Title').getAttribute('href'), href);
  });

  it('Should call onClick callback', done => {
    let doneOp = () => {
      done();
    };
    render(<Button onClick={doneOp}>Title</Button>);
    userEvent.click(screen.getByText('Title'));
  });

  it('Should be disabled', () => {
    render(<Button disabled>Title</Button>);
    assert.ok(screen.getByText('Title').disabled);
  });

  it('Should be disabled link', () => {
    render(
      <Button disabled href="#">
        Title
      </Button>
    );
    assert.ok(screen.getByText('Title').className.match(/\bdisabled\b/));
  });

  it('Should have block class', () => {
    render(<Button block>Title</Button>);
    assert.ok(screen.getByText('Title').className.match(/\bbtn-block\b/));
  });

  it('Should apply bsStyle class', () => {
    render(<Button bsStyle="danger">Title</Button>);
    assert.ok(screen.getByText('Title').className.match(/\bbtn-danger\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    render(
      <Button className="bob" bsStyle="danger">
        Title
      </Button>
    );
    assert.ok(screen.getByText('Title').className.match(/\bbob\b/));
    assert.ok(screen.getByText('Title').className.match(/\bbtn-danger\b/));
  });

  it('Should default to bsStyle="default"', () => {
    render(<Button bsStyle="default">Title</Button>);
    assert.ok(screen.getByText('Title').className.match(/\b\b/));
  });

  it('Should be active', () => {
    render(<Button active>Title</Button>);
    assert.ok(screen.getByText('Title').className.match(/\bactive\b/));
  });
});
