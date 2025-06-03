"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Prev = exports.Next = exports.Last = exports.First = exports.Ellipsis = void 0;
exports["default"] = PaginationItem;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));
var _excluded = ["active", "disabled", "className", "style", "activeLabel", "children"],
  _excluded2 = ["disabled", "children", "className"];
var propTypes = {
  eventKey: _propTypes["default"].any,
  className: _propTypes["default"].string,
  onSelect: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  active: _propTypes["default"].bool,
  activeLabel: _propTypes["default"].string.isRequired
};
var defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};
function PaginationItem(_ref) {
  var active = _ref.active,
    disabled = _ref.disabled,
    className = _ref.className,
    style = _ref.style,
    activeLabel = _ref.activeLabel,
    children = _ref.children,
    props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
  var Component = active || disabled ? 'span' : _SafeAnchor["default"];
  return _react["default"].createElement("li", {
    style: style,
    className: (0, _classnames["default"])(className, {
      active: active,
      disabled: disabled
    })
  }, _react["default"].createElement(Component, (0, _extends2["default"])({
    disabled: disabled
  }, props), children, active && _react["default"].createElement("span", {
    className: "sr-only"
  }, activeLabel)));
}
PaginationItem.propTypes = propTypes;
PaginationItem.defaultProps = defaultProps;
function createButton(name, defaultValue, label) {
  var _Class, _temp;
  if (label === void 0) {
    label = name;
  }
  return _temp = _Class = /*#__PURE__*/function (_React$Component) {
    function _Class() {
      return _React$Component.apply(this, arguments) || this;
    }
    (0, _inheritsLoose2["default"])(_Class, _React$Component);
    var _proto = _Class.prototype;
    _proto.render = function render() {
      var _this$props = this.props,
        disabled = _this$props.disabled,
        children = _this$props.children,
        className = _this$props.className,
        props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded2);
      var Component = disabled ? 'span' : _SafeAnchor["default"];
      return _react["default"].createElement("li", (0, _extends2["default"])({
        "aria-label": label,
        className: (0, _classnames["default"])(className, {
          disabled: disabled
        })
      }, props), _react["default"].createElement(Component, null, children || defaultValue));
    };
    return _Class;
  }(_react["default"].Component), _Class.displayName = name, _Class.propTypes = {
    disabled: _propTypes["default"].bool
  }, _temp;
}
var First = exports.First = createButton('First', "\xAB");
var Prev = exports.Prev = createButton('Prev', "\u2039");
var Ellipsis = exports.Ellipsis = createButton('Ellipsis', "\u2026", 'More');
var Next = exports.Next = createButton('Next', "\u203A");
var Last = exports.Last = createButton('Last', "\xBB");