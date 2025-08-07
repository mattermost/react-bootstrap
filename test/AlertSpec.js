import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Alert from '../src/Alert';

describe('<Alert>', () => {
  it('Should output a alert with message', () => {
    render(
      <Alert>
        <strong>Message</strong>
      </Alert>
    );
    assert.ok(screen.getByText('Message'));
  });

  it('Should have bsType by default', () => {
    render(<Alert>Message</Alert>);
    assert.ok(screen.getByRole('alert').className.match(/\balert\b/));
  });

  it('Should have dismissable style with onDismiss', () => {
    let noOp = () => {};
    render(<Alert onDismiss={noOp}>Message</Alert>);
    assert.ok(
      screen.getByRole('alert').className.match(/\balert-dismissable\b/)
    );
  });

  it('Should call onDismiss callback on dismiss click', done => {
    let doneOp = () => {
      done();
    };
    render(<Alert onDismiss={doneOp}>Message</Alert>);
    userEvent.click(screen.getByRole('alert').children[0]);
  });

  it('Should have a default bsStyle class', () => {
    render(<Alert>Message</Alert>);
    assert.ok(screen.getByRole('alert').className.match(/\balert-\w+\b/));
  });

  it('Should have use bsStyle class', () => {
    render(<Alert bsStyle="danger">Message</Alert>);
    assert.ok(screen.getByRole('alert').className.match(/\balert-danger\b/));
  });

  describe('Web Accessibility', () => {
    it('Should have alert role', () => {
      render(<Alert>Message</Alert>);

      assert.equal(screen.getByRole('alert').getAttribute('role'), 'alert');
    });

    it('Should call onDismiss callback when the sr-only dismiss link is activated', done => {
      let doneOp = () => {
        done();
      };
      render(<Alert onDismiss={doneOp}>Message</Alert>);

      userEvent.click(
        screen.getByRole('alert').getElementsByClassName('sr-only')[0]
      );
    });
  });
});
