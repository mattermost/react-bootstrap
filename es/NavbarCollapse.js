import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import React from 'react';
import Collapse from './Collapse';
import NavbarContext from './NavbarContext';
import { prefix } from './utils/bootstrapUtils';

var NavbarCollapse =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavbarCollapse, _React$Component);

  function NavbarCollapse() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarCollapse.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    var navbarProps = this.context || {
      bsClass: 'navbar'
    };
    var bsClassName = prefix(navbarProps, 'collapse');
    return React.createElement(Collapse, _extends({
      in: navbarProps.expanded
    }, props), React.createElement("div", {
      className: bsClassName
    }, children));
  };

  return NavbarCollapse;
}(React.Component);

NavbarCollapse.contextType = NavbarContext;
export default NavbarCollapse;