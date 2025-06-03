import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
var _excluded = ["className"];
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from './utils/bootstrapUtils';
var contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string
  })
};
var NavbarHeader = /*#__PURE__*/function (_React$Component) {
  function NavbarHeader() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(NavbarHeader, _React$Component);
  var _proto = NavbarHeader.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      className = _this$props.className,
      props = _objectWithoutPropertiesLoose(_this$props, _excluded);
    var navbarProps = this.context.$bs_navbar || {
      bsClass: 'navbar'
    };
    var bsClassName = prefix(navbarProps, 'header');
    return React.createElement("div", _extends({}, props, {
      className: classNames(className, bsClassName)
    }));
  };
  return NavbarHeader;
}(React.Component);
NavbarHeader.contextTypes = contextTypes;
export default NavbarHeader;