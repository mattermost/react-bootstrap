import { render, screen } from '@testing-library/react';
import React from 'react';

import Col from '../src/Col';

describe('Col', () => {
  it('Should set Offset of zero', () => {
    render(
      <Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0}>
        Content
      </Col>
    );

    let instanceClassName = screen.getByText('Content').className;
    assert.ok(instanceClassName.match(/\bcol-xs-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-offset-0\b/));
  });

  it('Should set Pull of zero', () => {
    render(
      <Col xsPull={0} smPull={0} mdPull={0} lgPull={0}>
        Content
      </Col>
    );

    let instanceClassName = screen.getByText('Content').className;
    assert.ok(instanceClassName.match(/\bcol-xs-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-pull-0\b/));
  });

  it('Should set Push of zero', () => {
    render(
      <Col xsPush={0} smPush={0} mdPush={0} lgPush={0}>
        Content
      </Col>
    );

    let instanceClassName = screen.getByText('Content').className;
    assert.ok(instanceClassName.match(/\bcol-xs-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-push-0\b/));
  });

  it('Should set Hidden to true', () => {
    render(
      <Col xsHidden smHidden mdHidden lgHidden>
        Content
      </Col>
    );

    let instanceClassName = screen.getByText('Content').className;
    assert.ok(instanceClassName.match(/\bhidden-xs\b/));
    assert.ok(instanceClassName.match(/\bhidden-sm\b/));
    assert.ok(instanceClassName.match(/\bhidden-md\b/));
    assert.ok(instanceClassName.match(/\bhidden-lg\b/));
  });
});
