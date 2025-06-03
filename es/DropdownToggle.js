import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
var _excluded = ["noCaret", "open", "useAnchor", "bsClass", "className", "children"];
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import SafeAnchor from './SafeAnchor';
import { bsClass as setBsClass } from './utils/bootstrapUtils';
var propTypes = {
  noCaret: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
  useAnchor: PropTypes.bool
};
var defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};
var DropdownToggle = /*#__PURE__*/function (_React$Component) {
  function DropdownToggle() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(DropdownToggle, _React$Component);
  var _proto = DropdownToggle.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      noCaret = _this$props.noCaret,
      open = _this$props.open,
      useAnchor = _this$props.useAnchor,
      bsClass = _this$props.bsClass,
      className = _this$props.className,
      children = _this$props.children,
      props = _objectWithoutPropertiesLoose(_this$props, _excluded);
    delete props.bsRole;
    var Component = useAnchor ? SafeAnchor : Button;
    var useCaret = !noCaret;

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.

    // FIXME: Should this really fall back to `title` as children?

    return React.createElement(Component, _extends({}, props, {
      role: "button",
      className: classNames(className, bsClass),
      "aria-haspopup": true,
      "aria-expanded": open
    }), children || props.title, useCaret && ' ', useCaret && React.createElement("span", {
      className: "caret"
    }));
  };
  return DropdownToggle;
}(React.Component);
DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;
export default setBsClass('dropdown-toggle', DropdownToggle);