import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import classNames from 'classnames';
import React from 'react';
import NavbarContext from './NavbarContext';
import { prefix } from './utils/bootstrapUtils';

var NavbarHeader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavbarHeader, _React$Component);

  function NavbarHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var navbarProps = this.context || {
      bsClass: 'navbar'
    };
    var bsClassName = prefix(navbarProps, 'header');
    return React.createElement("div", _extends({}, props, {
      className: classNames(className, bsClassName)
    }));
  };

  return NavbarHeader;
}(React.Component);

NavbarHeader.contextType = NavbarContext;
export default NavbarHeader;