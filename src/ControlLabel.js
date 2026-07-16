import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import FormGroupContext from './FormGroupContext';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: PropTypes.string,
  srOnly: PropTypes.bool
};

const defaultProps = {
  srOnly: false
};

class ControlLabel extends React.Component {
  render() {
    const formGroup = this.context;
    const controlId = formGroup && formGroup.controlId;

    const { htmlFor = controlId, srOnly, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    warning(
      controlId == null || htmlFor === controlId,
      '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.'
    );

    const classes = {
      ...getClassSet(bsProps),
      'sr-only': srOnly
    };

    return (
      <label
        {...elementProps}
        htmlFor={htmlFor}
        className={classNames(className, classes)}
      />
    );
  }
}

ControlLabel.propTypes = propTypes;
ControlLabel.defaultProps = defaultProps;
ControlLabel.contextType = FormGroupContext;

export default bsClass('control-label', ControlLabel);
