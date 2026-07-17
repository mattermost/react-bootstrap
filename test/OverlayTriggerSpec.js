import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import OverlayTrigger from '../src/OverlayTrigger';
import Popover from '../src/Popover';
import Tooltip from '../src/Tooltip';

describe('<OverlayTrigger>', () => {
  // Swallow extra props.
  const Div = ({ className, children }) => (
    <div className={className}>{children}</div>
  );

  it('Should create OverlayTrigger element', () => {
    render(
      <OverlayTrigger overlay={<Div>test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = screen.getByText('button');
    assert.equal(overlayTrigger.nodeName, 'BUTTON');
  });

  it('Should pass OverlayTrigger onClick prop to child', async () => {
    const callback = sinon.spy();
    render(
      <OverlayTrigger overlay={<Div>test</Div>} onClick={callback}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = screen.getByText('button');
    await userEvent.click(overlayTrigger);
    callback.called.should.be.true;
  });

  it('Should show after click trigger', async () => {
    render(
      <OverlayTrigger trigger="click" overlay={<Div>test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = screen.getByText('button');
    await userEvent.click(overlayTrigger);

    screen.getByText('test');
  });

  it('Should not set aria-describedby if the state is not show', () => {
    render(
      <OverlayTrigger trigger="click" overlay={<Div>test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = screen.getByText('button');

    assert.equal(overlayTrigger.getAttribute('aria-describedby'), null);
  });

  it('Should set aria-describedby if the state is show', async () => {
    render(
      <OverlayTrigger trigger="click" overlay={<Div id="overlayid">test</Div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    const overlayTrigger = screen.getByText('button');
    await userEvent.click(overlayTrigger);

    overlayTrigger.getAttribute('aria-describedby').should.be;
  });

  describe('trigger handlers', () => {
    it('Should keep trigger handlers', done => {
      render(
        <div>
          <OverlayTrigger trigger="focus" overlay={<Div>test</Div>}>
            <button onBlur={() => done()}>button</button>
          </OverlayTrigger>
          <input id="target" />
        </div>
      );

      const overlayTrigger = screen.getByText('button');
      act(() => {
        overlayTrigger.focus();
      });
      userEvent.keyboard('{Tab}');
    });
  });

  it('Should maintain overlay classname', async () => {
    render(
      <OverlayTrigger
        trigger="click"
        overlay={<Div className="test-overlay">test</Div>}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    const overlayTrigger = screen.getByText('button');
    await userEvent.click(overlayTrigger);

    expect(document.getElementsByClassName('test-overlay').length).to.equal(1);
  });

  it('Should pass transition callbacks to Transition', async () => {
    let count = 0;
    const increment = () => count++;

    let overlayTrigger;

    render(
      <OverlayTrigger
        trigger="click"
        overlay={<Div>test</Div>}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          userEvent.click(overlayTrigger);
        }}
      >
        <button>button</button>
      </OverlayTrigger>
    );

    overlayTrigger = screen.getByText('button');
    await userEvent.click(overlayTrigger);

    await waitFor(() => {
      expect(count).to.equal(6);
    });
  });

  it('Should forward requested context', async () => {
    const TestContext = React.createContext(undefined);
    TestContext.displayName = 'TestContext';

    const contextSpy = sinon.spy();

    class ContextReader extends React.Component {
      render() {
        contextSpy(this.context.key);
        return <div />;
      }
    }

    ContextReader.contextType = TestContext;

    class ContextHolder extends React.Component {
      render() {
        return (
          <TestContext.Provider value={{ key: 'value' }}>
            <OverlayTrigger trigger="click" overlay={<ContextReader />}>
              <button>button</button>
            </OverlayTrigger>
          </TestContext.Provider>
        );
      }
    }

    render(<ContextHolder />);
    const overlayTrigger = screen.getByText('button');
    await userEvent.click(overlayTrigger);

    contextSpy.calledWith('value').should.be.true;
  });

  describe('overlay types', () => {
    [
      {
        name: 'Popover',
        overlay: <Popover id="test-popover">test</Popover>
      },
      {
        name: 'Tooltip',
        overlay: <Tooltip id="test-tooltip">test</Tooltip>
      }
    ].forEach(testCase => {
      describe(testCase.name, () => {
        let overlayTrigger;

        beforeEach(() => {
          render(
            <OverlayTrigger trigger="click" overlay={testCase.overlay}>
              <button>button</button>
            </OverlayTrigger>
          );
          overlayTrigger = screen.getByText('button');
        });

        it('Should handle trigger without warnings', async () => {
          await userEvent.click(overlayTrigger);
        });
      });
    });
  });

  describe('rootClose', () => {
    [
      {
        label: 'true',
        rootClose: true,
        shownAfterClick: false
      },
      {
        label: 'default (false)',
        rootClose: null,
        shownAfterClick: true
      }
    ].forEach(testCase => {
      describe(testCase.label, () => {
        beforeEach(async () => {
          render(
            <OverlayTrigger
              overlay={<Div>test</Div>}
              trigger="click"
              rootClose={testCase.rootClose}
            >
              <button>button</button>
            </OverlayTrigger>
          );
          const overlayTrigger = screen.getByText('button');
          await userEvent.click(overlayTrigger);
        });

        it('Should have correct show state', async () => {
          // Need to click this way for it to propagate to document element.
          document.documentElement.click();

          await waitFor(() => {
            expect(Boolean(screen.queryByText('test'))).to.equal(
              testCase.shownAfterClick
            );
          });
        });
      });
    });

    describe('clicking on trigger to hide', () => {
      it('should hide after clicking on trigger', async () => {
        render(
          <OverlayTrigger overlay={<Div>test</Div>} trigger="click" rootClose>
            <button>button</button>
          </OverlayTrigger>
        );

        const node = screen.getByText('button');
        await waitFor(() => {
          expect(Boolean(screen.queryByText('test'))).to.equal(false);
        });

        node.click();
        await waitFor(() => {
          expect(Boolean(screen.queryByText('test'))).to.equal(true);
        });

        // Need to click this way for it to propagate to document element.
        node.click();
        await waitFor(() => {
          expect(Boolean(screen.queryByText('test'))).to.equal(false);
        });
      });
    });

    describe('replaced overlay', () => {
      beforeEach(async () => {
        class ReplacedOverlay extends React.Component {
          constructor(props) {
            super(props);

            this.handleClick = this.handleClick.bind(this);
            this.state = { replaced: false };
          }

          handleClick() {
            this.setState({ replaced: true });
          }

          render() {
            if (this.state.replaced) {
              return <div>replaced</div>;
            }

            return (
              <div>
                <a id="replace-overlay" onClick={this.handleClick}>
                  original
                </a>
              </div>
            );
          }
        }

        render(
          <OverlayTrigger
            overlay={<ReplacedOverlay />}
            trigger="click"
            rootClose
          >
            <button>button</button>
          </OverlayTrigger>
        );
        const overlayTrigger = screen.getByText('button');
        await userEvent.click(overlayTrigger);

        await waitFor(() => {
          expect(Boolean(screen.queryByText('original'))).to.equal(true);
        });
      });

      it('Should still be shown', async () => {
        // Need to click this way for it to propagate to document element.
        const replaceOverlay = document.getElementById('replace-overlay');
        replaceOverlay.click();

        await waitFor(() => {
          expect(Boolean(screen.queryByText('replaced'))).to.equal(true);
        });
      });
    });
  });
});
