import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';

import {
  bsClass,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';

const propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: isRequiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

  /**
   * Sets the direction the Popover is positioned towards.
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Popover.
   */
  positionTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The "left" position value for the Popover.
   */
  positionLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The "top" position value for the Popover arrow.
   */
  arrowOffsetTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The "left" position value for the Popover arrow.
   */
  arrowOffsetLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Title content
   */
  title: PropTypes.node
};

const Popover = React.forwardRef(
  (
    {
      placement = 'right',
      positionTop,
      positionLeft,
      arrowOffsetTop,
      arrowOffsetLeft,
      arrowRef,
      arrowStyle,
      title,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [placement]: true
    };

    const outerStyle = {
      display: 'block',
      top: positionTop,
      left: positionLeft,
      ...style
    };

    const combinedArrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft,
      ...arrowStyle
    };

    return (
      <div
        ref={ref}
        {...elementProps}
        role="tooltip"
        className={classNames(className, classes)}
        style={outerStyle}
      >
        <div ref={arrowRef} className="arrow" style={combinedArrowStyle} />

        {title && <h3 className={prefix(bsProps, 'title')}>{title}</h3>}

        <div className={prefix(bsProps, 'content')}>{children}</div>
      </div>
    );
  }
);

Popover.propTypes = propTypes;

export default bsClass('popover', Popover);
