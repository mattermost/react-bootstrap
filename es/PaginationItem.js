import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["active", "disabled", "className", "style", "activeLabel", "children"],
  _excluded2 = ["disabled", "children", "className"];
/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SafeAnchor from './SafeAnchor';
var propTypes = {
  eventKey: PropTypes.any,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  activeLabel: PropTypes.string.isRequired
};
var defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};
export default function PaginationItem(_ref) {
  var active = _ref.active,
    disabled = _ref.disabled,
    className = _ref.className,
    style = _ref.style,
    activeLabel = _ref.activeLabel,
    children = _ref.children,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var Component = active || disabled ? 'span' : SafeAnchor;
  return React.createElement("li", {
    style: style,
    className: classNames(className, {
      active: active,
      disabled: disabled
    })
  }, React.createElement(Component, _extends({
    disabled: disabled
  }, props), children, active && React.createElement("span", {
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
    _inheritsLoose(_Class, _React$Component);
    var _proto = _Class.prototype;
    _proto.render = function render() {
      var _this$props = this.props,
        disabled = _this$props.disabled,
        children = _this$props.children,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, _excluded2);
      var Component = disabled ? 'span' : SafeAnchor;
      return React.createElement("li", _extends({
        "aria-label": label,
        className: classNames(className, {
          disabled: disabled
        })
      }, props), React.createElement(Component, null, children || defaultValue));
    };
    return _Class;
  }(React.Component), _Class.displayName = name, _Class.propTypes = {
    disabled: PropTypes.bool
  }, _temp;
}
export var First = createButton('First', "\xAB");
export var Prev = createButton('Prev', "\u2039");
export var Ellipsis = createButton('Ellipsis', "\u2026", 'More');
export var Next = createButton('Next', "\u203A");
export var Last = createButton('Last', "\xBB");