"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor");
var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");
var _WeakMap = require("@babel/runtime-corejs2/core-js/weak-map");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Transition = _interopRequireWildcard(require("react-transition-group/Transition"));
var _excluded = ["className", "children"];
var _fadeStyles;
function _interopRequireWildcard(e, t) { if ("function" == typeof _WeakMap) var r = new _WeakMap(), n = new _WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
var propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  "in": _propTypes["default"].bool,
  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: _propTypes["default"].bool,
  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: _propTypes["default"].bool,
  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: _propTypes["default"].bool,
  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: _propTypes["default"].number,
  /**
   * Callback fired before the component fades in
   */
  onEnter: _propTypes["default"].func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: _propTypes["default"].func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: _propTypes["default"].func,
  /**
   * Callback fired before the component fades out
   */
  onExit: _propTypes["default"].func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: _propTypes["default"].func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: _propTypes["default"].func
};
var defaultProps = {
  "in": false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[_Transition.ENTERING] = 'in', _fadeStyles[_Transition.ENTERED] = 'in', _fadeStyles);
var Fade = /*#__PURE__*/function (_React$Component) {
  function Fade() {
    return _React$Component.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(Fade, _React$Component);
  var _proto = Fade.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      className = _this$props.className,
      children = _this$props.children,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    return _react["default"].createElement(_Transition["default"], props, function (status, innerProps) {
      return _react["default"].cloneElement(children, (0, _extends2["default"])({}, innerProps, {
        className: (0, _classnames["default"])('fade', className, children.props.className, fadeStyles[status])
      }));
    });
  };
  return Fade;
}(_react["default"].Component);
Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;
var _default = exports["default"] = Fade;
module.exports = exports["default"];