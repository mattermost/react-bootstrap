"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _InputGroupAddon = _interopRequireDefault(require("./InputGroupAddon"));
var _InputGroupButton = _interopRequireDefault(require("./InputGroupButton"));
var _bootstrapUtils = require("./utils/bootstrapUtils");
var _StyleConfig = require("./utils/StyleConfig");
var _excluded = ["className"];
var InputGroup = /*#__PURE__*/function (_React$Component) {
  function InputGroup() {
    return _React$Component.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(InputGroup, _React$Component);
  var _proto = InputGroup.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      className = _this$props.className,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];
    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react["default"].createElement("span", (0, _extends2["default"])({}, elementProps, {
      className: (0, _classnames["default"])(className, classes)
    }));
  };
  return InputGroup;
}(_react["default"].Component);
InputGroup.Addon = _InputGroupAddon["default"];
InputGroup.Button = _InputGroupButton["default"];
var _default = exports["default"] = (0, _bootstrapUtils.bsClass)('input-group', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], InputGroup));
module.exports = exports["default"];