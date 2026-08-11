"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

var SIZES = [_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL];
var propTypes = {
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: _propTypes.default.string,

  /**
   * A method to run for the mousedown event on the dialog.
   */
  handleDialogMouseDown: _propTypes.default.func,
  bsClass: _propTypes.default.string,
  bsSize: _propTypes.default.oneOf(SIZES)
};

var ModalDialog = _react.default.forwardRef(function (_ref, ref) {
  var _extends2;

  var dialogClassName = _ref.dialogClassName,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      handleDialogMouseDown = _ref.handleDialogMouseDown,
      _ref$bsClass = _ref.bsClass,
      bsClass = _ref$bsClass === void 0 ? 'modal' : _ref$bsClass,
      bsSize = _ref.bsSize,
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["dialogClassName", "className", "style", "children", "handleDialogMouseDown", "bsClass", "bsSize"]);

  var _splitBsProps = (0, _bootstrapUtils.splitBsProps)((0, _extends3.default)({}, props, {
    bsClass: bsClass,
    bsSize: bsSize
  })),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];

  var bsClassName = (0, _bootstrapUtils.prefix)(bsProps);
  var modalStyle = (0, _extends3.default)({
    display: 'block'
  }, style);
  var dialogClasses = (0, _extends3.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[bsClassName] = false, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'dialog')] = true, _extends2));
  return _react.default.createElement("div", (0, _extends3.default)({
    ref: ref
  }, elementProps, {
    tabIndex: "-1",
    role: "dialog",
    style: modalStyle,
    className: (0, _classnames.default)(className, bsClassName)
  }), _react.default.createElement("div", {
    className: (0, _classnames.default)(dialogClassName, dialogClasses)
  }, _react.default.createElement("div", {
    className: (0, _bootstrapUtils.prefix)(bsProps, 'content'),
    role: "document",
    onMouseDown: handleDialogMouseDown
  }, children)));
});

ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = propTypes;
ModalDialog.SIZES = SIZES;
var _default = ModalDialog;
exports.default = _default;
module.exports = exports["default"];