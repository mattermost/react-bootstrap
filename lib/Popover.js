"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isRequiredForA11y = _interopRequireDefault(require("prop-types-extra/lib/isRequiredForA11y"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: (0, _isRequiredForA11y.default)(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Sets the direction the Popover is positioned towards.
   */
  placement: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Popover.
   */
  positionTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Popover.
   */
  positionLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "top" position value for the Popover arrow.
   */
  arrowOffsetTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Popover arrow.
   */
  arrowOffsetLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Title content
   */
  title: _propTypes.default.node
};

var Popover = _react.default.forwardRef(function (_ref, ref) {
  var _extends2;

  var _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'right' : _ref$placement,
      positionTop = _ref.positionTop,
      positionLeft = _ref.positionLeft,
      arrowOffsetTop = _ref.arrowOffsetTop,
      arrowOffsetLeft = _ref.arrowOffsetLeft,
      arrowRef = _ref.arrowRef,
      arrowStyle = _ref.arrowStyle,
      title = _ref.title,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["placement", "positionTop", "positionLeft", "arrowOffsetTop", "arrowOffsetLeft", "arrowRef", "arrowStyle", "title", "className", "style", "children"]);

  var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];

  var classes = (0, _extends3.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));
  var outerStyle = (0, _extends3.default)({
    display: 'block',
    top: positionTop,
    left: positionLeft
  }, style);
  var combinedArrowStyle = (0, _extends3.default)({
    top: arrowOffsetTop,
    left: arrowOffsetLeft
  }, arrowStyle);
  return _react.default.createElement("div", (0, _extends3.default)({
    ref: ref
  }, elementProps, {
    role: "tooltip",
    className: (0, _classnames.default)(className, classes),
    style: outerStyle
  }), _react.default.createElement("div", {
    ref: arrowRef,
    className: "arrow",
    style: combinedArrowStyle
  }), title && _react.default.createElement("h3", {
    className: (0, _bootstrapUtils.prefix)(bsProps, 'title')
  }, title), _react.default.createElement("div", {
    className: (0, _bootstrapUtils.prefix)(bsProps, 'content')
  }, children));
});

Popover.propTypes = propTypes;

var _default = (0, _bootstrapUtils.bsClass)('popover', Popover);

exports.default = _default;
module.exports = exports["default"];