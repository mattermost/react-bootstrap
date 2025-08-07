import React from 'react';

import Breadcrumb from '../src/Breadcrumb';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Breadcrumb.Item>', () => {
  it('Should render `a` as inner element when is not active', () => {
    render(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>);

    assert.ok(screen.getByRole('button'));
    assert.notInclude(screen.getByText('Crumb').className, 'active');
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    render(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>);

    assert.include(document.querySelector('li').className, 'active');
    assert.ok(document.querySelector('li > span'));
  });

  it('Should render `span.active` when active and has href', () => {
    render(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>
    );

    assert.include(document.querySelector('li').className, 'active');

    const spanNode = document.querySelector('li > span');
    assert.ok(spanNode);
    assert.notOk(spanNode.hasAttribute('href'));

    assert.lengthOf(screen.queryAllByRole('button'), 0);
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    render(
      <Breadcrumb.Item className="custom-one custom-two">
        Active Crumb
      </Breadcrumb.Item>
    );

    const classes = document.querySelector('li').className;
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should spread additional props onto inner element', done => {
    const handleClick = () => {
      done();
    };

    render(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>
    );

    const anchorNode = screen.getByRole('button');
    userEvent.click(anchorNode);
  });

  it('Should apply id onto the anchor', () => {
    render(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>
    );

    const linkNode = screen.getByRole('button');
    assert.equal(linkNode.id, 'test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    render(
      <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
        Crumb
      </Breadcrumb.Item>
    );

    const linkNode = screen.getByRole('link');
    assert.equal(
      linkNode.href,
      'http://getbootstrap.com/components/#breadcrumbs'
    );
  });

  it('Should apply `title` property onto `a` inner element', () => {
    render(
      <Breadcrumb.Item
        title="test-title"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>
    );

    const linkNode = screen.getByRole('link');
    assert.equal(linkNode.title, 'test-title');
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    render(
      <Breadcrumb.Item title="test-title" href="/hi">
        Crumb
      </Breadcrumb.Item>
    );

    const liNode = document.querySelector('li');
    assert.notOk(liNode.hasAttribute('href'));
    assert.notOk(liNode.hasAttribute('title'));
  });

  it('Should set `target` attribute on `anchor`', () => {
    render(
      <Breadcrumb.Item
        target="_blank"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>
    );

    const linkNode = screen.getByRole('link');
    assert.equal(linkNode.target, '_blank');
  });
});
