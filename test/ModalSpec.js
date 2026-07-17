import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import events from 'dom-helpers/events';
import React from 'react';

import Modal from '../src/Modal';

describe('<Modal>', () => {
  it('Should render the modal content', () => {
    const noOp = () => {};
    let instance;
    render(
      <Modal
        ref={element => (instance = element)}
        show
        onHide={noOp}
        animation={false}
      >
        <strong>Message</strong>
      </Modal>
    );

    assert.ok(
      instance._modal.dialog
        .querySelector('[role=dialog]')
        .querySelector('strong')
    );
  });

  it('Should close the modal when the modal dialog is clicked', done => {
    const doneOp = () => {
      done();
    };

    let instance;
    render(
      <Modal ref={element => (instance = element)} show onHide={doneOp}>
        <strong>Message</strong>
      </Modal>
    );

    const dialog = instance._modal.dialog.querySelector('[role=dialog]');

    userEvent.click(dialog);
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();
    let instance;
    render(
      <Modal
        ref={element => (instance = element)}
        show
        onHide={onHideSpy}
        backdrop="static"
      >
        <strong>Message</strong>
      </Modal>
    );

    const dialog = instance._modal.dialog.querySelector('[role=dialog]');

    userEvent.click(dialog);

    expect(onHideSpy).to.not.have.been.called;
  });

  it('Should close the modal when the modal close button is clicked', done => {
    const doneOp = () => {
      done();
    };

    let instance;
    render(
      <Modal ref={element => (instance = element)} show onHide={doneOp}>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>
    );

    const button = instance._modal.dialog.getElementsByClassName('close')[0];

    userEvent.click(button);
  });

  it('Should close the modal when the escape key is pressed with keyboard=true', async () => {
    const handleHide = sinon.spy(() => {});

    render(
      <Modal show onHide={handleHide} keyboard>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>
    );

    await userEvent.keyboard('{escape}');

    assert.ok(handleHide.called);
  });

  it('Should not close the modal when the escape key is pressed with keyboard=false', async () => {
    const handleHide = sinon.spy();

    render(
      <Modal show onHide={handleHide} keyboard={false}>
        <Modal.Header closeButton />
        <strong>Message</strong>
      </Modal>
    );

    await userEvent.keyboard('{escape}');

    assert.ok(!handleHide.called);
  });

  it('Should pass className to the dialog', () => {
    const noOp = () => {};
    let instance;
    render(
      <Modal
        ref={element => (instance = element)}
        show
        className="mymodal"
        onHide={noOp}
      >
        <strong>Message</strong>
      </Modal>
    );

    const dialog = instance._modal.dialog.querySelector('[role=dialog]');

    assert.ok(dialog.className.match(/\bmymodal\b/));
  });

  it('Should use bsClass on the dialog', () => {
    const noOp = () => {};
    let instance;
    render(
      <Modal
        ref={element => (instance = element)}
        show
        bsClass="mymodal"
        onHide={noOp}
      >
        <strong>Message</strong>
      </Modal>
    );

    const modal = instance._modal.dialog.querySelector('[role=dialog]');

    assert.ok(modal.className.match(/\bmymodal\b/));
    assert.ok(modal.children[0].className.match(/\bmymodal-dialog\b/));
    assert.ok(
      modal.children[0].children[0].className.match(/\bmymodal-content\b/)
    );

    assert.ok(document.querySelector('.mymodal-backdrop'));
  });

  it('Should use backdropClassName to add classes to the backdrop', () => {
    const noOp = () => {};
    render(
      <Modal show backdropClassName="my-modal-backdrop" onHide={noOp}>
        <strong>Message</strong>
      </Modal>
    );

    assert.ok(document.querySelector('.modal-backdrop.my-modal-backdrop'));
  });

  it('Should pass bsSize to the dialog', () => {
    const noOp = () => {};
    let instance;
    render(
      <Modal
        ref={element => (instance = element)}
        show
        bsSize="small"
        onHide={noOp}
      >
        <strong>Message</strong>
      </Modal>
    );

    const dialog = instance._modal.dialog.getElementsByClassName(
      'modal-dialog'
    )[0];

    assert.ok(dialog.className.match(/\bmodal-sm\b/));
  });

  it('Should pass dialog style to the dialog', () => {
    const noOp = () => {};
    let instance;
    render(
      <Modal
        ref={element => (instance = element)}
        show
        style={{ top: 1000 }}
        onHide={noOp}
      >
        <strong>Message</strong>
      </Modal>
    );

    const dialog = instance._modal.dialog.querySelector('[role=dialog]');

    assert.ok(dialog.style.top === '1000px');
  });

  it('Should pass dialogClassName to the dialog', () => {
    const noOp = () => {};
    let instance;
    render(
      <Modal
        ref={element => (instance = element)}
        show
        dialogClassName="testCss"
        onHide={noOp}
      >
        <strong>Message</strong>
      </Modal>
    );

    const dialog = instance._modal.dialog.querySelector('.modal-dialog');

    assert.ok(dialog.className.match(/\btestCss\b/));
  });

  it('Should use dialogComponentClass', () => {
    const noOp = () => {};

    function CustomDialog() {
      return <div className="custom-dialog" tabIndex="-1" />;
    }

    let instance;
    render(
      <Modal
        ref={element => (instance = element)}
        show
        dialogComponentClass={CustomDialog}
        onHide={noOp}
      >
        <strong>Message</strong>
      </Modal>
    );

    assert.equal(
      instance._modal.dialog.firstElementChild.className,
      'custom-dialog'
    );
  });

  it('Should pass transition callbacks to Transition', done => {
    let count = 0;
    const increment = () => {
      ++count;
    };

    let rerender;

    function modalWithProps(show) {
      return (
        <Modal
          show={show}
          onHide={() => {}}
          onExit={increment}
          onExiting={increment}
          onExited={() => {
            increment();
            expect(count).to.equal(6);
            done();
          }}
          onEnter={increment}
          onEntering={increment}
          onEntered={() => {
            increment();
            requestAnimationFrame(() => {
              rerender(modalWithProps(false));
            });
          }}
        >
          <strong>Message</strong>
        </Modal>
      );
    }

    rerender = render(modalWithProps(true)).rerender;
  });

  describe('cleanup', () => {
    let offSpy;

    beforeEach(() => {
      offSpy = sinon.spy(events, 'off');
    });

    afterEach(() => {
      events.off.restore();
    });

    it('should remove resize listener when unmounted', async () => {
      class Component extends React.Component {
        constructor(props, context) {
          super(props, context);

          this.state = {
            show: true
          };
        }

        render() {
          if (!this.state.show) {
            return null;
          }

          return <Modal show>Foo</Modal>;
        }
      }

      let instance;
      render(<Component ref={element => (instance = element)} />);
      instance.setState({ show: false });

      await waitFor(() => {
        expect(offSpy).to.have.been.calledWith(window, 'resize');
      });
    });
  });
});
