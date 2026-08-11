import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { getClassSet, prefix, splitBsProps } from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';
var SIZES = [Size.LARGE, Size.SMALL];
var propTypes = {
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: PropTypes.string,

  /**
   * A method to run for the mousedown event on the dialog.
   */
  handleDialogMouseDown: PropTypes.func,
  bsClass: PropTypes.string,
  bsSize: PropTypes.oneOf(SIZES)
};
var ModalDialog = React.forwardRef(function (_ref, ref) {
  var _extends2;

  var dialogClassName = _ref.dialogClassName,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      handleDialogMouseDown = _ref.handleDialogMouseDown,
      _ref$bsClass = _ref.bsClass,
      bsClass = _ref$bsClass === void 0 ? 'modal' : _ref$bsClass,
      bsSize = _ref.bsSize,
      props = _objectWithoutPropertiesLoose(_ref, ["dialogClassName", "className", "style", "children", "handleDialogMouseDown", "bsClass", "bsSize"]);

  var _splitBsProps = splitBsProps(_extends({}, props, {
    bsClass: bsClass,
    bsSize: bsSize
  })),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];

  var bsClassName = prefix(bsProps);

  var modalStyle = _extends({
    display: 'block'
  }, style);

  var dialogClasses = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[bsClassName] = false, _extends2[prefix(bsProps, 'dialog')] = true, _extends2));

  return React.createElement("div", _extends({
    ref: ref
  }, elementProps, {
    tabIndex: "-1",
    role: "dialog",
    style: modalStyle,
    className: classNames(className, bsClassName)
  }), React.createElement("div", {
    className: classNames(dialogClassName, dialogClasses)
  }, React.createElement("div", {
    className: prefix(bsProps, 'content'),
    role: "document",
    onMouseDown: handleDialogMouseDown
  }, children)));
});
ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = propTypes;
ModalDialog.SIZES = SIZES;
export default ModalDialog;