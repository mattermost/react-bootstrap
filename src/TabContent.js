/* eslint-disable react/no-unused-state */
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import TabContainerContext from './TabContainerContext';
import TabContentContext from './TabContentContext';
import {
  bsClass as setBsClass,
  prefix,
  splitBsPropsAndOmit
} from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s. Use
   * `false` to disable, `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: PropTypes.oneOfType([PropTypes.bool, elementType]),

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: PropTypes.bool
};

const defaultProps = {
  componentClass: 'div',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

class TabContent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handlePaneEnter = this.handlePaneEnter.bind(this);
    this.handlePaneExited = this.handlePaneExited.bind(this);

    // Active entries in state will be `null` unless `animation` is set. Need
    // to track active child in case keys swap and the active child changes
    // but the active key does not.
    this.state = {
      activeKey: null,
      activeChild: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    // An active child is only ever recorded while animating, so once animation
    // is turned off there is nothing left for it to track.
    if (!props.animation && state.activeChild) {
      return { activeKey: null, activeChild: null };
    }

    return null;
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  getContainerActiveKey() {
    const tabContainer = this.context;
    return tabContainer && tabContainer.activeKey;
  }

  handlePaneEnter(child, childKey) {
    if (!this.props.animation) {
      return false;
    }

    // It's possible that this child should be transitioning out.
    if (childKey !== this.getContainerActiveKey()) {
      return false;
    }

    this.setState({
      activeKey: childKey,
      activeChild: child
    });

    return true;
  }

  handlePaneExited(child) {
    // This might happen as everything is unmounting.
    if (this.isUnmounted) {
      return;
    }

    this.setState(({ activeChild }) => {
      if (activeChild !== child) {
        return null;
      }

      return {
        activeKey: null,
        activeChild: null
      };
    });
  }

  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
      'animation',
      'mountOnEnter',
      'unmountOnExit'
    ]);

    const { bsClass, animation, mountOnEnter, unmountOnExit } = this.props;

    const stateActiveKey = this.state.activeKey;
    const containerActiveKey = this.getContainerActiveKey();

    const activeKey =
      stateActiveKey != null ? stateActiveKey : containerActiveKey;
    const exiting =
      stateActiveKey != null && stateActiveKey !== containerActiveKey;

    const tabContentContext = {
      bsClass,
      animation,
      activeKey,
      mountOnEnter,
      unmountOnExit,
      onPaneEnter: this.handlePaneEnter,
      onPaneExited: this.handlePaneExited,
      exiting
    };

    return (
      <TabContentContext.Provider value={tabContentContext}>
        <Component
          {...elementProps}
          className={classNames(className, prefix(bsProps, 'content'))}
        />
      </TabContentContext.Provider>
    );
  }
}

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;
TabContent.contextType = TabContainerContext;

export default setBsClass('tab', TabContent);
