import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Collapse from '../src/Collapse';

describe('<Collapse>', () => {
  let Component;

  beforeEach(() => {
    Component = class extends React.Component {
      render() {
        let { children, ...props } = this.props;

        return (
          <Collapse
            ref={r => (this.collapse = r)}
            getDimensionValue={() => 15}
            {...props}
            {...this.state}
          >
            <div>
              <div>{children}</div>
            </div>
          </Collapse>
        );
      }
    };
  });

  it('Should default to collapsed', () => {
    let instance;
    render(
      <Component ref={element => (instance = element)}>Panel content</Component>
    );

    assert.ok(instance.collapse.props.in === false);
  });

  describe('collapsed', () => {
    it('Should have collapse class', () => {
      render(<Component>Panel content</Component>);

      assert.ok(document.querySelector('.collapse'));
    });
  });

  describe('from collapsed to expanded', () => {
    let instance;

    beforeEach(() => {
      render(
        <Component ref={element => (instance = element)}>
          Panel content
        </Component>
      );

      // since scrollHeight is gonna be 0 detached from the DOM
      sinon.stub(instance.collapse, '_getScrollDimensionValue').returns('15px');
    });

    it('Should have collapsing class', () => {
      act(() => {
        instance.setState({ in: true });
      });

      let node = screen.getByText('Panel content').parentElement;

      assert.equal(node.className, 'collapsing');
    });

    it('Should set initial 0px height', done => {
      let node = screen.getByText('Panel content').parentElement;

      function onEnter() {
        assert.equal(node.style.height, '0px');
        done();
      }

      assert.equal(node.style.height, '');

      act(() => {
        instance.setState({ in: true, onEnter });
      });
    });

    it('Should set node to height', () => {
      let node = screen.getByText('Panel content').parentElement;

      assert.equal(node.style.height, '');

      act(() => {
        instance.setState({ in: true });
      });
      assert.equal(node.style.height, '15px');
    });

    it('Should transition from collapsing to not collapsing', async () => {
      let node = screen.getByText('Panel content').parentElement;

      function onEntered() {
        assert.equal(node.className, 'collapse in');
      }

      act(() => {
        instance.setState({ in: true, onEntered });
      });

      assert.equal(node.className, 'collapsing');

      await waitFor(() => {
        assert.equal(node.className, 'collapse in');
      });
    });

    it('Should clear height after transition complete', async () => {
      let node = screen.getByText('Panel content').parentElement;

      function onEntered() {
        assert.equal(node.style.height, '');
      }

      assert.equal(node.style.height, '');

      act(() => {
        instance.setState({ in: true, onEntered });
      });

      assert.equal(node.style.height, '15px');

      await waitFor(() => {
        assert.equal(node.style.height, '');
      });
    });
  });

  describe('from expanded to collapsed', () => {
    let instance;

    beforeEach(() => {
      render(
        <Component ref={element => (instance = element)} in>
          Panel content
        </Component>
      );
    });

    it('Should have collapsing class', () => {
      act(() => {
        instance.setState({ in: false });
      });
      let node = screen.getByText('Panel content').parentElement;
      assert.equal(node.className, 'collapsing');
    });

    it('Should set initial height', () => {
      let node = screen.getByText('Panel content').parentElement;

      function onExit() {
        assert.equal(node.style.height, '15px');
      }

      assert.equal(node.style.height, '');
      act(() => {
        instance.setState({ in: false, onExit });
      });
    });

    it('Should set node to height', () => {
      let node = screen.getByText('Panel content').parentElement;
      assert.equal(node.style.height, '');

      act(() => {
        instance.setState({ in: false });
      });
      assert.equal(node.style.height, '0px');
    });

    it('Should transition from collapsing to not collapsing', async () => {
      let node = screen.getByText('Panel content').parentElement;

      function onExited() {
        assert.equal(node.className, 'collapse');
      }

      act(() => {
        instance.setState({ in: false, onExited });
      });

      assert.equal(node.className, 'collapsing');

      await waitFor(() => {
        assert.equal(node.className, 'collapse');
      });
    });

    it('Should have 0px height after transition complete', async () => {
      let node = screen.getByText('Panel content').parentElement;

      function onExited() {
        assert.ok(node.style.height === '0px');
      }

      assert.equal(node.style.height, '');

      act(() => {
        instance.setState({ in: false, onExited });
      });

      await waitFor(() => {
        assert.ok(node.style.height === '0px');
      });
    });
  });

  describe('expanded', () => {
    it('Should have collapse and in class', () => {
      render(<Component in>Panel content</Component>);

      expect(
        screen.getByText('Panel content').parentElement.className
      ).to.match(/\bcollapse in\b/);
    });
  });

  describe('dimension', () => {
    let instance;

    beforeEach(() => {
      render(
        <Component ref={element => (instance = element)}>
          Panel content
        </Component>
      );
    });

    it('Defaults to height', () => {
      assert.equal(instance.collapse.getDimension(), 'height');
    });

    it('Uses getCollapsibleDimension if exists', () => {
      function dimension() {
        return 'whatevs';
      }

      act(() => {
        instance.setState({ dimension });
      });

      assert.equal(instance.collapse.getDimension(), 'whatevs');
    });
  });

  describe('with a role', () => {
    let instance;

    beforeEach(() => {
      render(
        <Component ref={element => (instance = element)} role="note">
          Panel content
        </Component>
      );
    });

    it('sets aria-expanded true when expanded', () => {
      let node = screen.getByRole('note');
      act(() => {
        instance.setState({ in: true });
      });
      assert.equal(node.getAttribute('aria-expanded'), 'true');
    });

    it('sets aria-expanded false when collapsed', () => {
      let node = screen.getByRole('note');
      act(() => {
        instance.setState({ in: false });
      });
      assert.equal(node.getAttribute('aria-expanded'), 'false');
    });
  });
});
