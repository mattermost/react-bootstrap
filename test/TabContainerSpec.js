import { act, render } from '@testing-library/react';
import React from 'react';

import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import TabPane from '../src/TabPane';
import TabContent from '../src/TabContent';
import TabContainer from '../src/TabContainer';

import { assertSingle, assertNone } from './helpers';

// Asserts that exactly one pane is active and that it corresponds to the given
// `eventKey`. Replaces enzyme's `assertSingle('[eventKey=N]').assertSingle('.active')`
// — `<TabContainer id="custom-id">` generates pane ids of the form
// `custom-id-pane-<eventKey>`.
function assertActivePane(container, eventKey) {
  const active = assertSingle(container, '.tab-pane.active');
  active.id.should.equal(`custom-id-pane-${eventKey}`);
}

describe('<TabContainer>', () => {
  it('should not propagate context past TabPanes', () => {
    const { container } = render(
      <TabContainer id="custom-id">
        <div>
          <Nav>
            <NavItem eventKey="1">One</NavItem>
          </Nav>
          <TabContent>
            <TabPane eventKey="1">
              <Nav>
                <NavItem eventKey="2">One</NavItem>
              </Nav>
            </TabPane>
          </TabContent>
        </div>
      </TabContainer>
    );

    // The top-level `<Nav>` reads the `<TabContainer>` context and so defaults
    // its role to `tablist`. The `<Nav>` nested inside the `<TabPane>` does not,
    // because the context is reset to `null` past `<TabPane>`s.
    const navs = container.querySelectorAll('.nav');
    const top = navs[0];
    const nested = navs[1];

    expect(top.getAttribute('role')).to.equal('tablist');
    expect(nested.getAttribute('role')).to.not.exist;
  });

  it('should match up ids', () => {
    const { container } = render(
      <TabContainer id="custom-id">
        <div>
          <Nav>
            <NavItem eventKey="1">One</NavItem>
          </Nav>
          <TabContent>
            <TabPane eventKey="1" />
          </TabContent>
        </div>
      </TabContainer>
    );

    let tabId = container.querySelector('.nav a').id;
    let paneId = container.querySelector('.tab-pane').id;

    expect(tabId).to.exist;
    expect(paneId).to.exist;

    assertSingle(container, `a[aria-controls="${paneId}"]`);
    assertSingle(container, `div[aria-labelledby="${tabId}"]`);
  });

  it('should default Nav role to tablist', () => {
    const { container } = render(
      <TabContainer id="custom-id">
        <div>
          <Nav bsStyle="pills">
            <NavItem eventKey="1">One</NavItem>
          </Nav>
        </div>
      </TabContainer>
    );

    container
      .querySelector('.nav')
      .getAttribute('role')
      .should.equal('tablist');

    container
      .querySelector('.nav a')
      .getAttribute('role')
      .should.equal('tab');
  });

  it('should use explicit Nav role', () => {
    const { container } = render(
      <TabContainer id="custom-id">
        <div>
          <Nav role="navigation" bsStyle="pills">
            <NavItem href="#foo" eventKey="1">
              One
            </NavItem>
          </Nav>
        </div>
      </TabContainer>
    );

    container
      .querySelector('.nav')
      .getAttribute('role')
      .should.equal('navigation');

    // make sure its not passed to the NavItem
    expect(container.querySelector('.nav a').getAttribute('role')).to.not.exist;
  });

  describe('tab switching edge cases', () => {
    class Switcher extends React.Component {
      state = { ...this.props };

      render() {
        const {
          eventKeys,
          show = true,
          onSelect = () => {},
          tabProps = [],
          ...props
        } = this.state;

        if (!show) {
          return null;
        }

        return (
          <TabContainer {...props} id="custom-id" onSelect={onSelect}>
            <TabContent>
              {eventKeys.map((eventKey, index) => (
                <TabPane key={index} eventKey={eventKey} {...tabProps[index]} />
              ))}
            </TabContent>
          </TabContainer>
        );
      }
    }

    it('should not get stuck after tab becomes unmounted', () => {
      const ref = React.createRef();
      const { container } = render(
        <Switcher ref={ref} eventKeys={[1, 2]} activeKey={2} />
      );

      assertSingle(container, '.tab-content');
      assertActivePane(container, 2);

      act(() => {
        ref.current.setState({ eventKeys: [1] });
      });
      assertNone(container, '.tab-pane.active');

      act(() => {
        ref.current.setState({ activeKey: 1 });
      });
      assertActivePane(container, 1);
    });

    it('should handle closing tab and changing active tab', () => {
      const ref = React.createRef();
      const { container } = render(
        <Switcher ref={ref} eventKeys={[1, 2]} activeKey={2} />
      );

      assertActivePane(container, 2);

      act(() => {
        ref.current.setState({ eventKeys: [1], activeKey: 1 });
      });
      assertActivePane(container, 1);
    });

    it('should not call onSelect when container unmounts', () => {
      const spy = sinon.spy();
      const ref = React.createRef();
      const { container } = render(
        <Switcher ref={ref} eventKeys={[1]} activeKey={1} onSelect={spy} />
      );

      assertSingle(container, '.tab-pane');

      act(() => {
        ref.current.setState({ show: false });
      });
      spy.should.have.not.been.called;
    });

    it('should clean up unmounted tab state', () => {
      const ref = React.createRef();
      const { container } = render(
        <Switcher ref={ref} eventKeys={[1, 2, 3]} activeKey={3} />
      );

      container.querySelectorAll('.tab-pane').length.should.equal(3);
      assertActivePane(container, 3);

      act(() => {
        ref.current.setState({ eventKeys: [1, 2], activeKey: 2 });
      });
      container.querySelectorAll('.tab-pane').length.should.equal(2);
      assertActivePane(container, 2);
    });

    it('should not get stuck if tab stops animating', () => {
      const ref = React.createRef();
      const { container } = render(
        <Switcher ref={ref} eventKeys={[1, 2]} activeKey={1} />
      );

      assertActivePane(container, 1);

      act(() => {
        ref.current.setState({ animation: false });
      });
      assertActivePane(container, 1);

      act(() => {
        ref.current.setState({ activeKey: 2 });
      });
      assertActivePane(container, 2);

      act(() => {
        ref.current.setState({ animation: true });
      });
      act(() => {
        ref.current.setState({ activeKey: 1 });
      });
      assertActivePane(container, 2);
    });

    it('should handle simultaneous eventKey and activeKey change', () => {
      const ref = React.createRef();
      const { container } = render(
        <Switcher ref={ref} eventKeys={[1, 2]} activeKey={2} />
      );

      assertActivePane(container, 2);

      act(() => {
        ref.current.setState({ eventKeys: [1, 3], activeKey: 3 });
      });
      assertActivePane(container, 3);

      act(() => {
        ref.current.setState({ eventKeys: [1, 4], activeKey: 4 });
      });
      assertActivePane(container, 4);
    });

    it('should not get stuck if eventKey ceases to exist', () => {
      const ref = React.createRef();
      const { container } = render(
        <Switcher ref={ref} eventKeys={[1, 2]} activeKey={2} />
      );

      assertActivePane(container, 2);

      act(() => {
        ref.current.setState({ eventKeys: [1, 3] });
      });
      assertNone(container, '.tab-pane.active');

      act(() => {
        ref.current.setState({ activeKey: 3 });
      });
      assertActivePane(container, 3);

      // Check that active state lingers after changing event key.
      act(() => {
        ref.current.setState({ activeKey: 1 });
      });
      assertActivePane(container, 3);

      // But once event key changes again, make sure active state switches.
      act(() => {
        ref.current.setState({ eventKeys: [1, 2] });
      });
      assertActivePane(container, 1);
    });

    [[[1, 2], [2, 1]], [[2, 1], [1, 2]]].forEach(([order1, order2]) => {
      it('should handle event key swaps', () => {
        const ref = React.createRef();
        const { container } = render(
          <Switcher ref={ref} eventKeys={order1} activeKey={1} />
        );

        assertActivePane(container, 1);

        act(() => {
          ref.current.setState({ eventKeys: order2 });
        });
        assertActivePane(container, 1);

        // Check that the animation is still wired up.
        act(() => {
          ref.current.setState({ activeKey: 2 });
        });
        assertActivePane(container, 1);
      });
    });
  });
});
