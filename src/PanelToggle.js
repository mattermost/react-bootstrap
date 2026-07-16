import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import PanelContext from './PanelContext';
import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  /**
   * only here to satisfy linting, just the html onClick handler.
   *
   * @private
   */
  onClick: PropTypes.func,
  /**
   * You can use a custom element for this component
   */
  componentClass: elementType
};

const defaultProps = {
  componentClass: SafeAnchor
};

class PanelToggle extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    const { onToggle } = this.context || {};

    if (onToggle) {
      onToggle(event);
    }
  }

  render() {
    const { onClick, className, componentClass, ...props } = this.props;
    const { expanded, bodyId } = this.context || {};
    const Component = componentClass;

    props.onClick = createChainedFunction(onClick, this.handleToggle);

    props['aria-expanded'] = expanded;
    props.className = classNames(className, !expanded && 'collapsed');

    if (bodyId) {
      props['aria-controls'] = bodyId;
    }

    return <Component {...props} />;
  }
}

PanelToggle.propTypes = propTypes;
PanelToggle.defaultProps = defaultProps;
PanelToggle.contextType = PanelContext;

export default PanelToggle;
