import { act, render, screen } from '@testing-library/react';
import React from 'react';

import Fade from '../src/Fade';

describe('Fade', () => {
  let Component;

  beforeEach(() => {
    Component = class extends React.Component {
      render() {
        let { children, ...props } = this.props;

        return (
          <Fade ref={r => (this.fade = r)} {...props} {...this.state}>
            <div>{children}</div>
          </Fade>
        );
      }
    };
  });

  it('Should default to hidden', () => {
    let instance;
    render(
      <Component ref={element => (instance = element)}>Panel content</Component>
    );

    assert.ok(instance.fade.props.in === false);
  });

  it('Should always have the "fade" class', () => {
    let instance;
    render(
      <Component ref={element => (instance = element)}>Panel content</Component>
    );

    assert.ok(instance.fade.props.in === false);

    assert.equal(screen.getByText('Panel content').className, 'fade');
  });

  it('Should add "in" class when entering', done => {
    let instance;
    render(
      <Component ref={element => (instance = element)}>Panel content</Component>
    );

    function onEntering() {
      assert.equal(screen.getByText('Panel content').className, 'fade in');
      done();
    }

    assert.ok(instance.fade.props.in === false);

    act(() => {
      instance.setState({ in: true, onEntering });
    });
  });

  it('Should remove "in" class when exiting', done => {
    let instance;
    render(
      <Component ref={element => (instance = element)} in>
        Panel content
      </Component>
    );

    function onExiting() {
      assert.equal(screen.getByText('Panel content').className, 'fade');
      done();
    }

    assert.equal(screen.getByText('Panel content').className, 'fade in');

    act(() => {
      instance.setState({ in: false, onExiting });
    });
  });
});
