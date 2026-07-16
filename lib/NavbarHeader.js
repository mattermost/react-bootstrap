"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _NavbarContext = _interopRequireDefault(require("./NavbarContext"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var NavbarHeader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(NavbarHeader, _React$Component);

  function NavbarHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className"]);
    var navbarProps = this.context || {
      bsClass: 'navbar'
    };
    var bsClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'header');
    return _react.default.createElement("div", (0, _extends2.default)({}, props, {
      className: (0, _classnames.default)(className, bsClassName)
    }));
  };

  return NavbarHeader;
}(_react.default.Component);

NavbarHeader.contextType = _NavbarContext.default;
var _default = NavbarHeader;
exports.default = _default;
module.exports = exports["default"];