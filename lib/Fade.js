"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Transition = _interopRequireWildcard(require("react-transition-group/Transition"));

var _mergeRefs = require("./utils/mergeRefs");

var _fadeStyles;

var propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: _propTypes.default.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: _propTypes.default.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: _propTypes.default.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: _propTypes.default.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired after the has component faded in
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired before the component fades out
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: _propTypes.default.func,

  /**
   * Callback fired after the component has faded out
   */
  onExited: _propTypes.default.func
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[_Transition.ENTERING] = 'in', _fadeStyles[_Transition.ENTERED] = 'in', _fadeStyles);

var Fade = _react.default.forwardRef(function (_ref, ref) {
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
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["className", "children", "in", "timeout", "mountOnEnter", "unmountOnExit", "appear"]);

  var childRef = _react.default.useRef(null);

  var setChildRef = (0, _mergeRefs.useMergedRef)([childRef, (0, _mergeRefs.getElementRef)(children), ref]);
  return _react.default.createElement(_Transition.default, (0, _extends2.default)({}, props, {
    in: inProp,
    timeout: timeout,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: appear,
    nodeRef: childRef
  }), function (status, innerProps) {
    return _react.default.cloneElement(children, (0, _extends2.default)({}, innerProps, {
      ref: setChildRef,
      className: (0, _classnames.default)('fade', className, children.props.className, fadeStyles[status])
    }));
  });
});

Fade.displayName = 'Fade';
Fade.propTypes = propTypes;
var _default = Fade;
exports.default = _default;
module.exports = exports["default"];