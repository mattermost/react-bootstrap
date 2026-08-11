import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import BaseOverlay from 'react-overlays/Overlay';
import elementType from 'prop-types-extra/lib/elementType';

import Fade from './Fade';

const propTypes = {
  ...BaseOverlay.propTypes,

  /**
   * The element that's rendered in the overlay
   */
  children: PropTypes.node,

  /**
   * Set the visibility of the Overlay
   */
  show: PropTypes.bool,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: PropTypes.bool,
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: PropTypes.func,

  /**
   * Use animation
   */
  animation: PropTypes.oneOfType([PropTypes.bool, elementType]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: PropTypes.func,

  /**
   * Sets the direction of the Overlay.
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

const defaultProps = {
  animation: Fade,
  rootClose: false,
  show: false,
  placement: 'right'
};

class Overlay extends React.Component {
  render() {
    const { animation, children, ...props } = this.props;

    const transition = animation === true ? Fade : animation || null;

    let child;

    if (!transition) {
      child = cloneElement(children, {
        className: classNames(children.props.className, 'in')
      });
    } else {
      child = children;
    }

    return (
      <BaseOverlay {...props} container={document.body} transition={transition}>
        {({ arrowProps, placement, props: overlayProps }) => {
          const positionTop =
            overlayProps && overlayProps.style && overlayProps.style.top;
          const positionLeft =
            overlayProps && overlayProps.style && overlayProps.style.left;

          // Passing the positionX and arrowOffsetX props is redundant with the style props,
          // but it matches how react-overlays used to behave.
          return React.cloneElement(child, {
            ...overlayProps,
            placement,
            positionTop,
            positionLeft,
            arrowOffsetTop:
              arrowProps && arrowProps.style && arrowProps.style.top,
            arrowOffsetLeft:
              arrowProps && arrowProps.style && arrowProps.style.left,
            arrowRef: arrowProps.ref,
            arrowStyle: arrowProps.style,
            style: {
              ...child.props.style,
              ...overlayProps.style,
              left: positionLeft,
              top: positionTop
            }
          });
        }}
      </BaseOverlay>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
