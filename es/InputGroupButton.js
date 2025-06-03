import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
var _excluded = ["className"];
import classNames from 'classnames';
import React from 'react';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';
var InputGroupButton = /*#__PURE__*/function (_React$Component) {
  function InputGroupButton() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(InputGroupButton, _React$Component);
  var _proto = InputGroupButton.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      className = _this$props.className,
      props = _objectWithoutPropertiesLoose(_this$props, _excluded);
    var _splitBsProps = splitBsProps(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];
    var classes = getClassSet(bsProps);
    return React.createElement("span", _extends({}, elementProps, {
      className: classNames(className, classes)
    }));
  };
  return InputGroupButton;
}(React.Component);
export default bsClass('input-group-btn', InputGroupButton);