"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _Collapse = _interopRequireDefault(require("./Collapse"));

var _NavbarContext = _interopRequireDefault(require("./NavbarContext"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var NavbarCollapse =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(NavbarCollapse, _React$Component);

  function NavbarCollapse() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarCollapse.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children"]);
    var navbarProps = this.context || {
      bsClass: 'navbar'
    };
    var bsClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'collapse');
    return _react.default.createElement(_Collapse.default, (0, _extends2.default)({
      in: navbarProps.expanded
    }, props), _react.default.createElement("div", {
      className: bsClassName
    }, children));
  };

  return NavbarCollapse;
}(_react.default.Component);

NavbarCollapse.contextType = _NavbarContext.default;
var _default = NavbarCollapse;
exports.default = _default;
module.exports = exports["default"];