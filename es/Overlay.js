import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import classNames from 'classnames';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import BaseOverlay from 'react-overlays/Overlay';
import elementType from 'prop-types-extra/lib/elementType';
import Fade from './Fade';

var propTypes = _extends({}, BaseOverlay.propTypes, {
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
});

var defaultProps = {
  animation: Fade,
  rootClose: false,
  show: false,
  placement: 'right'
};

var Overlay =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Overlay, _React$Component);

  function Overlay() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Overlay.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        animation = _this$props.animation,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["animation", "children"]);

    var transition = animation === true ? Fade : animation || null;
    var child;

    if (!transition) {
      child = cloneElement(children, {
        className: classNames(children.props.className, 'in')
      });
    } else {
      child = children;
    }

    return React.createElement(BaseOverlay, _extends({}, props, {
      container: document.body,
      transition: transition
    }), function (_ref) {
      var arrowProps = _ref.arrowProps,
          placement = _ref.placement,
          overlayProps = _ref.props;
      var positionTop = overlayProps && overlayProps.style && overlayProps.style.top;
      var positionLeft = overlayProps && overlayProps.style && overlayProps.style.left; // Passing the positionX and arrowOffsetX props is redundant with the style props,
      // but it matches how react-overlays used to behave.

      return React.cloneElement(child, _extends({}, overlayProps, {
        placement: placement,
        positionTop: positionTop,
        positionLeft: positionLeft,
        arrowOffsetTop: arrowProps && arrowProps.style && arrowProps.style.top,
        arrowOffsetLeft: arrowProps && arrowProps.style && arrowProps.style.left,
        arrowRef: arrowProps.ref,
        arrowStyle: arrowProps.style,
        style: _extends({}, child.props.style, overlayProps.style, {
          left: positionLeft,
          top: positionTop
        })
      }));
    });
  };

  return Overlay;
}(React.Component);

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
export default Overlay;