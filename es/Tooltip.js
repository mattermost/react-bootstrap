import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { bsClass, getClassSet, prefix, splitBsProps } from './utils/bootstrapUtils';
var propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /**
   * Sets the direction the Tooltip is positioned towards.
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Tooltip.
   */
  positionTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The "left" position value for the Tooltip.
   */
  positionLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The "top" position value for the Tooltip arrow.
   */
  arrowOffsetTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The "left" position value for the Tooltip arrow.
   */
  arrowOffsetLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
var Tooltip = React.forwardRef(function (_ref, ref) {
  var _extends2;

  var _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'right' : _ref$placement,
      positionTop = _ref.positionTop,
      positionLeft = _ref.positionLeft,
      arrowOffsetTop = _ref.arrowOffsetTop,
      arrowOffsetLeft = _ref.arrowOffsetLeft,
      arrowRef = _ref.arrowRef,
      arrowStyle = _ref.arrowStyle,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["placement", "positionTop", "positionLeft", "arrowOffsetTop", "arrowOffsetLeft", "arrowRef", "arrowStyle", "className", "style", "children"]);

  var _splitBsProps = splitBsProps(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];

  var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));

  var outerStyle = _extends({
    top: positionTop,
    left: positionLeft
  }, style);

  var combinedArrowStyle = _extends({
    top: arrowOffsetTop,
    left: arrowOffsetLeft
  }, arrowStyle);

  return React.createElement("div", _extends({
    ref: ref
  }, elementProps, {
    role: "tooltip",
    className: classNames(className, classes),
    style: outerStyle
  }), React.createElement("div", {
    ref: arrowRef,
    className: prefix(bsProps, 'arrow'),
    style: combinedArrowStyle
  }), React.createElement("div", {
    className: prefix(bsProps, 'inner')
  }, children));
});
Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = propTypes;
export default bsClass('tooltip', Tooltip);