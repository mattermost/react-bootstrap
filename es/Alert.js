import _Object$values from "@babel/runtime-corejs2/core-js/object/values";
import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
var _excluded = ["onDismiss", "closeLabel", "className", "children"];
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { bsClass, bsStyles, getClassSet, prefix, splitBsProps } from './utils/bootstrapUtils';
import { State } from './utils/StyleConfig';
import CloseButton from './CloseButton';
var propTypes = {
  onDismiss: PropTypes.func,
  closeLabel: PropTypes.string
};
var defaultProps = {
  closeLabel: 'Close alert'
};
var Alert = /*#__PURE__*/function (_React$Component) {
  function Alert() {
    return _React$Component.apply(this, arguments) || this;
  }
  _inheritsLoose(Alert, _React$Component);
  var _proto = Alert.prototype;
  _proto.render = function render() {
    var _extends2;
    var _this$props = this.props,
      onDismiss = _this$props.onDismiss,
      closeLabel = _this$props.closeLabel,
      className = _this$props.className,
      children = _this$props.children,
      props = _objectWithoutPropertiesLoose(_this$props, _excluded);
    var _splitBsProps = splitBsProps(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];
    var dismissable = !!onDismiss;
    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'dismissable')] = dismissable, _extends2));
    return React.createElement("div", _extends({}, elementProps, {
      role: "alert",
      className: classNames(className, classes)
    }), dismissable && React.createElement(CloseButton, {
      onClick: onDismiss,
      label: closeLabel
    }), children);
  };
  return Alert;
}(React.Component);
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export default bsStyles(_Object$values(State), State.INFO, bsClass('alert', Alert));