"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor");
var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");
var _WeakMap = require("@babel/runtime-corejs2/core-js/weak-map");
exports.__esModule = true;
exports["default"] = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _warning = _interopRequireDefault(require("warning"));
var _bootstrapUtils = require("./utils/bootstrapUtils");
var _excluded = ["a16by9", "a4by3", "className", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof _WeakMap) var r = new _WeakMap(), n = new _WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
// TODO: This should probably take a single `aspectRatio` prop.

var propTypes = {
  /**
   * This component requires a single child element
   */
  children: _propTypes["default"].element.isRequired,
  /**
   * 16by9 aspect ratio
   */
  a16by9: _propTypes["default"].bool,
  /**
   * 4by3 aspect ratio
   */
  a4by3: _propTypes["default"].bool
};
var defaultProps = {
  a16by9: false,
  a4by3: false
};
var ResponsiveEmbed = /*#__PURE__*/function (_React$Component) {
  function ResponsiveEmbed() {
    return _React$Component.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(ResponsiveEmbed, _React$Component);
  var _proto = ResponsiveEmbed.prototype;
  _proto.render = function render() {
    var _extends2;
    var _this$props = this.props,
      a16by9 = _this$props.a16by9,
      a4by3 = _this$props.a4by3,
      className = _this$props.className,
      children = _this$props.children,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(a16by9 || a4by3, 'Either `a16by9` or `a4by3` must be set.') : void 0;
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!(a16by9 && a4by3), 'Only one of `a16by9` or `a4by3` can be set.') : void 0;
    var classes = (0, _extends3["default"])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, '16by9')] = a16by9, _extends2[(0, _bootstrapUtils.prefix)(bsProps, '4by3')] = a4by3, _extends2));
    return _react["default"].createElement("div", {
      className: (0, _classnames["default"])(classes)
    }, (0, _react.cloneElement)(children, (0, _extends3["default"])({}, elementProps, {
      className: (0, _classnames["default"])(className, (0, _bootstrapUtils.prefix)(bsProps, 'item'))
    })));
  };
  return ResponsiveEmbed;
}(_react["default"].Component);
ResponsiveEmbed.propTypes = propTypes;
ResponsiveEmbed.defaultProps = defaultProps;
var _default = exports["default"] = (0, _bootstrapUtils.bsClass)('embed-responsive', ResponsiveEmbed);
module.exports = exports["default"];