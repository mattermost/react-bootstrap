"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));
var _bootstrapUtils = require("./utils/bootstrapUtils");
var _excluded = ["className"];
var Breadcrumb = /*#__PURE__*/function (_React$Component) {
  function Breadcrumb() {
    return _React$Component.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(Breadcrumb, _React$Component);
  var _proto = Breadcrumb.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      className = _this$props.className,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];
    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react["default"].createElement("ol", (0, _extends2["default"])({}, elementProps, {
      role: "navigation",
      "aria-label": "breadcrumbs",
      className: (0, _classnames["default"])(className, classes)
    }));
  };
  return Breadcrumb;
}(_react["default"].Component);
Breadcrumb.Item = _BreadcrumbItem["default"];
var _default = exports["default"] = (0, _bootstrapUtils.bsClass)('breadcrumb', Breadcrumb);
module.exports = exports["default"];