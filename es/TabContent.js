import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";

/* eslint-disable react/no-unused-state */
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
import TabContainerContext from './TabContainerContext';
import TabContentContext from './TabContentContext';
import { bsClass as setBsClass, prefix, splitBsPropsAndOmit } from './utils/bootstrapUtils';
var propTypes = {
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
var defaultProps = {
  componentClass: 'div',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

var TabContent =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabContent, _React$Component);

  function TabContent(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handlePaneEnter = _this.handlePaneEnter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePaneExited = _this.handlePaneExited.bind(_assertThisInitialized(_assertThisInitialized(_this))); // Active entries in state will be `null` unless `animation` is set. Need
    // to track active child in case keys swap and the active child changes
    // but the active key does not.

    _this.state = {
      activeKey: null,
      activeChild: null
    };
    return _this;
  }

  TabContent.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    // An active child is only ever recorded while animating, so once animation
    // is turned off there is nothing left for it to track.
    if (!props.animation && state.activeChild) {
      return {
        activeKey: null,
        activeChild: null
      };
    }

    return null;
  };

  var _proto = TabContent.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.isUnmounted = true;
  };

  _proto.getContainerActiveKey = function getContainerActiveKey() {
    var tabContainer = this.context;
    return tabContainer && tabContainer.activeKey;
  };

  _proto.handlePaneEnter = function handlePaneEnter(child, childKey) {
    if (!this.props.animation) {
      return false;
    } // It's possible that this child should be transitioning out.


    if (childKey !== this.getContainerActiveKey()) {
      return false;
    }

    this.setState({
      activeKey: childKey,
      activeChild: child
    });
    return true;
  };

  _proto.handlePaneExited = function handlePaneExited(child) {
    // This might happen as everything is unmounting.
    if (this.isUnmounted) {
      return;
    }

    this.setState(function (_ref) {
      var activeChild = _ref.activeChild;

      if (activeChild !== child) {
        return null;
      }

      return {
        activeKey: null,
        activeChild: null
      };
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['animation', 'mountOnEnter', 'unmountOnExit']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var _this$props2 = this.props,
        bsClass = _this$props2.bsClass,
        animation = _this$props2.animation,
        mountOnEnter = _this$props2.mountOnEnter,
        unmountOnExit = _this$props2.unmountOnExit;
    var stateActiveKey = this.state.activeKey;
    var containerActiveKey = this.getContainerActiveKey();
    var activeKey = stateActiveKey != null ? stateActiveKey : containerActiveKey;
    var exiting = stateActiveKey != null && stateActiveKey !== containerActiveKey;
    var tabContentContext = {
      bsClass: bsClass,
      animation: animation,
      activeKey: activeKey,
      mountOnEnter: mountOnEnter,
      unmountOnExit: unmountOnExit,
      onPaneEnter: this.handlePaneEnter,
      onPaneExited: this.handlePaneExited,
      exiting: exiting
    };
    return React.createElement(TabContentContext.Provider, {
      value: tabContentContext
    }, React.createElement(Component, _extends({}, elementProps, {
      className: classNames(className, prefix(bsProps, 'content'))
    })));
  };

  return TabContent;
}(React.Component);

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;
TabContent.contextType = TabContainerContext;
export default setBsClass('tab', TabContent);