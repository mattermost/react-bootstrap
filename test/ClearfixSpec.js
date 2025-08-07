import { render } from '@testing-library/react';
import React from 'react';

import Clearfix from '../src/Clearfix';

describe('<Clearfix>', () => {
  it('uses "div" by default', () => {
    render(<Clearfix />);

    assert.equal(document.querySelector('.clearfix').nodeName, 'DIV');
  });

  it('has "clearfix" class', () => {
    render(<Clearfix>Clearfix content</Clearfix>);
    assert.equal(document.querySelector('.clearfix').className, 'clearfix');
  });

  it('Defaults to no visible block classes', () => {
    render(<Clearfix />);

    let instanceClassName = document.querySelector('.clearfix').className;
    assert.ok(!instanceClassName.match(/\bvisible-xs-block\b/));
    assert.ok(!instanceClassName.match(/\bvisible-sm-block\b/));
    assert.ok(!instanceClassName.match(/\bvisible-md-block\b/));
    assert.ok(!instanceClassName.match(/\bvisible-lg-block\b/));
  });

  it('Should apply visible block classes', () => {
    render(
      <Clearfix visibleXsBlock visibleSmBlock visibleMdBlock visibleLgBlock />
    );

    let instanceClassName = document.querySelector('.clearfix').className;
    assert.ok(instanceClassName.match(/\bvisible-xs-block\b/));
    assert.ok(instanceClassName.match(/\bvisible-sm-block\b/));
    assert.ok(instanceClassName.match(/\bvisible-md-block\b/));
    assert.ok(instanceClassName.match(/\bvisible-lg-block\b/));
  });

  it('Should merge additional classes passed in', () => {
    render(<Clearfix className="bob" />);
    assert.ok(document.querySelector('.clearfix').className.match(/\bbob\b/));
    assert.ok(
      document.querySelector('.clearfix').className.match(/\bclearfix\b/)
    );
  });

  it('allows custom elements instead of "div"', () => {
    render(<Clearfix componentClass="section" />);

    assert.equal(document.querySelector('.clearfix').nodeName, 'SECTION');
  });
});
