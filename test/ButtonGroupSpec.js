import { render } from '@testing-library/react';
import React from 'react';

import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

import { shouldWarn } from './helpers';

describe('ButtonGroup', () => {
  it('Should output a button group', () => {
    render(
      <ButtonGroup>
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.equal(document.querySelector('.btn-group').nodeName, 'DIV');
    assert.ok(
      document.querySelector('.btn-group').className.match(/\bbtn-group\b/)
    );
  });

  it('Should add size', () => {
    render(
      <ButtonGroup bsSize="large">
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.ok(
      document.querySelector('.btn-group').className.match(/\bbtn-group-lg\b/)
    );
  });

  it('Should add vertical variation', () => {
    render(
      <ButtonGroup vertical>
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.equal(
      document.querySelector('.btn-group-vertical').className.trim(),
      'btn-group-vertical'
    );
  });

  it('Should add block variation', () => {
    render(
      <ButtonGroup vertical block>
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.ok(
      document
        .querySelector('.btn-group-vertical')
        .className.match(/\bbtn-block\b/)
    );
  });

  it('Should warn about block without vertical', () => {
    shouldWarn('`block` requires `vertical` to be set to have any effect');

    render(
      <ButtonGroup block>
        <Button>Title</Button>
      </ButtonGroup>
    );
  });

  it('Should add justified variation', () => {
    render(
      <ButtonGroup justified>
        <Button>Title</Button>
      </ButtonGroup>
    );
    assert.ok(
      document
        .querySelector('.btn-group')
        .className.match(/\bbtn-group-justified\b/)
    );
  });
});
