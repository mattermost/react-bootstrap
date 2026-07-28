import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { getClassSet, prefix, splitBsProps } from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';

const SIZES = [Size.LARGE, Size.SMALL];

const propTypes = {
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

const ModalDialog = React.forwardRef(
  (
    {
      dialogClassName,
      className,
      style,
      children,
      handleDialogMouseDown,
      bsClass = 'modal',
      bsSize,
      ...props
    },
    ref
  ) => {
    const [bsProps, elementProps] = splitBsProps({
      ...props,
      bsClass,
      bsSize
    });

    const bsClassName = prefix(bsProps);

    const modalStyle = { display: 'block', ...style };

    const dialogClasses = {
      ...getClassSet(bsProps),
      [bsClassName]: false,
      [prefix(bsProps, 'dialog')]: true
    };

    return (
      <div
        ref={ref}
        {...elementProps}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(className, bsClassName)}
      >
        <div className={classNames(dialogClassName, dialogClasses)}>
          <div
            className={prefix(bsProps, 'content')}
            role="document"
            onMouseDown={handleDialogMouseDown}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = propTypes;
ModalDialog.SIZES = SIZES;

export default ModalDialog;
