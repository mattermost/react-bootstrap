import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import ToggleButtonGroup from '../src/ToggleButtonGroup';

describe('ToggleButtonGroup', () => {
  it('should render checkboxes', () => {
    const { container } = render(
      <ToggleButtonGroup type="checkbox">
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    );

    container.querySelectorAll('input[type="checkbox"]').length.should.equal(3);
  });

  it('should render radios', () => {
    const { container } = render(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    );

    container.querySelectorAll('input[type="radio"]').length.should.equal(3);
  });

  it('should select initial values', () => {
    const { container } = render(
      <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    );

    container.querySelectorAll('input:checked').length.should.equal(2);
  });

  it('should disable radios', () => {
    const { container } = render(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button value={1} disabled>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2} disabled>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    );

    container.querySelectorAll('input:disabled').length.should.equal(2);
  });

  it('should return an array of values', () => {
    const spy = sinon.spy();
    const { container } = render(
      <ToggleButtonGroup type="checkbox" onChange={spy}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    );

    fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[1]);

    spy.should.have.been.calledWith([2]);
  });

  it('should return a single value', () => {
    const spy = sinon.spy();
    const { container } = render(
      <ToggleButtonGroup type="radio" name="items" onChange={spy}>
        <ToggleButtonGroup.Button value={1}>Option 1</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={2}>Option 2</ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button value={3}>Option 3</ToggleButtonGroup.Button>
      </ToggleButtonGroup>
    );

    fireEvent.click(container.querySelectorAll('input[type="radio"]')[1]);

    spy.should.have.been.calledWith(2);
  });
});
