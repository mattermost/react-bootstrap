import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import Transition, {
  ENTERED,
  ENTERING
} from 'react-transition-group/Transition';
import { getElementRef, useMergedRef } from './utils/mergeRefs';
import withRef from './utils/withRef';

const propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: PropTypes.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: PropTypes.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: PropTypes.func
};

const fadeStyles = {
  [ENTERING]: 'in',
  [ENTERED]: 'in'
};

const Fade = React.forwardRef(
  (
    {
      className,
      children,
      in: inProp = false,
      timeout = 300,
      mountOnEnter = false,
      unmountOnExit = false,
      appear = false,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props
    },
    ref
  ) => {
    const childRef = useRef(null);

    const setChildRef = useMergedRef([childRef, getElementRef(children), ref]);

    // Transition doesn't pass the node as the first parameter of these callbacks when nodeRef is used,
    // so we add that ourselves to keep the API for Fade consistent
    const callbacks = {
      onEnter: useMemo(() => withRef(onEnter, childRef), [onEnter]),
      onEntering: useMemo(() => withRef(onEntering, childRef), [onEntering]),
      onEntered: useMemo(() => withRef(onEntered, childRef), [onEntered]),
      onExit: useMemo(() => withRef(onExit, childRef), [onExit]),
      onExiting: useMemo(() => withRef(onExiting, childRef), [onExiting]),
      onExited: useMemo(() => withRef(onExited, childRef), [onExited])
    };

    return (
      <Transition
        {...props}
        {...callbacks}
        in={inProp}
        timeout={timeout}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear={appear}
        nodeRef={childRef}
      >
        {(status, innerProps) =>
          React.cloneElement(children, {
            ...innerProps,
            ref: setChildRef,
            className: classNames(
              'fade',
              className,
              children.props.className,
              fadeStyles[status]
            )
          })
        }
      </Transition>
    );
  }
);

Fade.displayName = 'Fade';
Fade.propTypes = propTypes;

export default Fade;
