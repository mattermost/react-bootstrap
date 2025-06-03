"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor");
var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");
var _WeakMap = require("@babel/runtime-corejs2/core-js/weak-map");
exports.__esModule = true;
exports["default"] = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Overlay = _interopRequireDefault(require("react-overlays/lib/Overlay"));
var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));
var _Fade = _interopRequireDefault(require("./Fade"));
var _excluded = ["animation", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof _WeakMap) var r = new _WeakMap(), n = new _WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
var propTypes = (0, _extends2["default"])({}, _Overlay["default"].propTypes, {
  /**
   * Set the visibility of the Overlay
   */
  show: _propTypes["default"].bool,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: _propTypes["default"].bool,
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: _propTypes["default"].func,
  /**
   * Use animation
   */
  animation: _propTypes["default"].oneOfType([_propTypes["default"].bool, _elementType["default"]]),
  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: _propTypes["default"].func,
  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: _propTypes["default"].func,
  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: _propTypes["default"].func,
  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: _propTypes["default"].func,
  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: _propTypes["default"].func,
  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: _propTypes["default"].func,
  /**
   * Sets the direction of the Overlay.
   */
  placement: _propTypes["default"].oneOf(['top', 'right', 'bottom', 'left'])
});
var defaultProps = {
  animation: _Fade["default"],
  rootClose: false,
  show: false,
  placement: 'right'
};
var Overlay = /*#__PURE__*/function (_React$Component) {
  function Overlay() {
    return _React$Component.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(Overlay, _React$Component);
  var _proto = Overlay.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      animation = _this$props.animation,
      children = _this$props.children,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    var transition = animation === true ? _Fade["default"] : animation || null;
    var child;
    if (!transition) {
      child = (0, _react.cloneElement)(children, {
        className: (0, _classnames["default"])(children.props.className, 'in')
      });
    } else {
      child = children;
    }
    return _react["default"].createElement(_Overlay["default"], (0, _extends2["default"])({}, props, {
      transition: transition
    }), child);
  };
  return Overlay;
}(_react["default"].Component);
Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
var _default = exports["default"] = Overlay;
module.exports = exports["default"];