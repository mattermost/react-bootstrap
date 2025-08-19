import { render, screen } from '@testing-library/react';
import React from 'react';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';
import { shouldWarn } from './helpers';

describe('<FormGroup>', () => {
  it('renders children', () => {
    render(
      <FormGroup>
        <span className="child1">Child 1</span>
        <span className="child2">Child 2</span>
      </FormGroup>
    );

    assert.ok(screen.getByText('Child 1'));
    assert.ok(screen.getByText('Child 2'));
  });

  it('renders with form-group class', () => {
    render(
      <FormGroup>
        <span />
      </FormGroup>
    );

    assert.ok(document.querySelector('.form-group'));
  });

  it('renders form-group with sm or lg class when bsSize is small or large', () => {
    const { rerender } = render(
      <FormGroup bsSize="small">
        <span />
      </FormGroup>
    );

    assert.ok(document.querySelector('.form-group.form-group-sm'));

    rerender(
      <FormGroup bsSize="large">
        <span />
      </FormGroup>
    );

    assert.ok(document.querySelector('.form-group.form-group-lg'));
  });

  [
    {
      props: { validationState: 'success' },
      className: 'has-success'
    },
    {
      props: { validationState: 'warning' },
      className: 'has-warning'
    },
    {
      props: { validationState: 'error' },
      className: 'has-error'
    },
    {
      props: { className: 'custom-group' },
      className: 'custom-group'
    }
  ].forEach(({ props, className }) => {
    it(`does not render ${className} class`, () => {
      render(
        <FormGroup>
          <span />
        </FormGroup>
      );
      assert.ok(
        !document.querySelector('.form-group').classList.contains(className)
      );
    });

    it(`renders with ${className} class`, () => {
      render(
        <FormGroup {...props}>
          <span />
        </FormGroup>
      );
      assert.ok(
        document.querySelector('.form-group').classList.contains(className)
      );
    });
  });

  describe('feedback', () => {
    it('should not have feedback without feedback component', () => {
      render(<FormGroup validationState="success" />);
      assert.ok(
        !document
          .querySelector('.form-group')
          .classList.contains('has-feedback')
      );
    });

    it('should have feedback with feedback component', () => {
      render(
        <FormGroup validationState="success">
          <FormControl.Feedback />
        </FormGroup>
      );
      assert.ok(
        document.querySelector('.form-group').classList.contains('has-feedback')
      );
    });

    it('should have feedback with nested feedback component', () => {
      render(
        <FormGroup validationState="success">
          <div>
            <FormControl.Feedback />
          </div>
        </FormGroup>
      );
      assert.ok(
        document.querySelector('.form-group').classList.contains('has-feedback')
      );
    });

    it('should have feedback with custom feedback component', () => {
      shouldWarn('React does not recognize the `bsRole` prop on a DOM element');

      render(
        <FormGroup validationState="success">
          <div bsRole="feedback" />
        </FormGroup>
      );
      assert.ok(
        document.querySelector('.form-group').classList.contains('has-feedback')
      );
    });
  });
});
