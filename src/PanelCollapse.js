import PropTypes from 'prop-types';
import React from 'react';

import { prefix, splitBsProps, bsClass } from './utils/bootstrapUtils';
import Collapse from './Collapse';
import PanelContext from './PanelContext';

const propTypes = {
  /**
   * Callback fired before the component expands
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: PropTypes.func
};

class PanelCollapse extends React.Component {
  render() {
    const { children } = this.props;
    const { headingId, bodyId, bsClass: _bsClass, expanded } =
      this.context || {};

    const [bsProps, props] = splitBsProps(this.props);

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId && bodyId) {
      props.id = bodyId;
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = headingId;
    }

    return (
      <Collapse in={expanded} {...props}>
        <div className={prefix(bsProps, 'collapse')}>{children}</div>
      </Collapse>
    );
  }
}

PanelCollapse.propTypes = propTypes;
PanelCollapse.contextType = PanelContext;

export default bsClass('panel', PanelCollapse);
