import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";

var _fadeStyles;

import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Transition, { ENTERED, ENTERING } from 'react-transition-group/Transition';
import { getElementRef, useMergedRef } from './utils/mergeRefs';
var propTypes = {
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
var fadeStyles = (_fadeStyles = {}, _fadeStyles[ENTERING] = 'in', _fadeStyles[ENTERED] = 'in', _fadeStyles);
var Fade = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      _ref$in = _ref.in,
      inProp = _ref$in === void 0 ? false : _ref$in,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 300 : _ref$timeout,
      _ref$mountOnEnter = _ref.mountOnEnter,
      mountOnEnter = _ref$mountOnEnter === void 0 ? false : _ref$mountOnEnter,
      _ref$unmountOnExit = _ref.unmountOnExit,
      unmountOnExit = _ref$unmountOnExit === void 0 ? false : _ref$unmountOnExit,
      _ref$appear = _ref.appear,
      appear = _ref$appear === void 0 ? false : _ref$appear,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "children", "in", "timeout", "mountOnEnter", "unmountOnExit", "appear"]);

  var childRef = React.useRef(null);
  var setChildRef = useMergedRef([childRef, getElementRef(children), ref]);
  return React.createElement(Transition, _extends({}, props, {
    in: inProp,
    timeout: timeout,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: appear,
    nodeRef: childRef
  }), function (status, innerProps) {
    return React.cloneElement(children, _extends({}, innerProps, {
      ref: setChildRef,
      className: classNames('fade', className, children.props.className, fadeStyles[status])
    }));
  });
});
Fade.displayName = 'Fade';
Fade.propTypes = propTypes;
export default Fade;