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
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _PagerItem = _interopRequireDefault(require("./PagerItem"));
var _bootstrapUtils = require("./utils/bootstrapUtils");
var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));
var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));
var _excluded = ["onSelect", "className", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof _WeakMap) var r = new _WeakMap(), n = new _WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
var propTypes = {
  onSelect: _propTypes["default"].func
};
var Pager = /*#__PURE__*/function (_React$Component) {
  function Pager() {
    return _React$Component.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(Pager, _React$Component);
  var _proto = Pager.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      onSelect = _this$props.onSelect,
      className = _this$props.className,
      children = _this$props.children,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];
    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react["default"].createElement("ul", (0, _extends2["default"])({}, elementProps, {
      className: (0, _classnames["default"])(className, classes)
    }), _ValidComponentChildren["default"].map(children, function (child) {
      return (0, _react.cloneElement)(child, {
        onSelect: (0, _createChainedFunction["default"])(child.props.onSelect, onSelect)
      });
    }));
  };
  return Pager;
}(_react["default"].Component);
Pager.propTypes = propTypes;
Pager.Item = _PagerItem["default"];
var _default = exports["default"] = (0, _bootstrapUtils.bsClass)('pager', Pager);
module.exports = exports["default"];