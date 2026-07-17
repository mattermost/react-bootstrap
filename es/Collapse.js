import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import _parseInt from "@babel/runtime-corejs2/core-js/parse-int";

var _collapseStyles;

import classNames from 'classnames';
import css from 'dom-helpers/style';
import React from 'react';
import PropTypes from 'prop-types';
import Transition, { EXITED, ENTERED, ENTERING, EXITING } from 'react-transition-group/Transition';
import capitalize from './utils/capitalize';
import createChainedFunction from './utils/createChainedFunction';
var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
}; // reading a dimension prop will cause the browser to recalculate,
// which will let our animations work

function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

function getDimensionValue(dimension, elem) {
  var value = elem["offset" + capitalize(dimension)];
  var margins = MARGINS[dimension];
  return value + _parseInt(css(elem, margins[0]), 10) + _parseInt(css(elem, margins[1]), 10);
}

var collapseStyles = (_collapseStyles = {}, _collapseStyles[EXITED] = 'collapse', _collapseStyles[EXITING] = 'collapsing', _collapseStyles[ENTERING] = 'collapsing', _collapseStyles[ENTERED] = 'collapse in', _collapseStyles);
var propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in: PropTypes.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  appear: PropTypes.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: PropTypes.number,

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
  onExited: PropTypes.func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: PropTypes.oneOfType([PropTypes.oneOf(['height', 'width']), PropTypes.func]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: PropTypes.func,

  /**
   * ARIA role of collapsible element
   */
  role: PropTypes.string
};
var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  dimension: 'height',
  getDimensionValue: getDimensionValue
};

var Collapse =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Collapse, _React$Component);

  function Collapse(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleEnter = function () {
      _this.childRef.current.style[_this.getDimension()] = '0';
    };

    _this.handleEntering = function () {
      var dimension = _this.getDimension();

      _this.childRef.current.style[dimension] = _this._getScrollDimensionValue(_this.childRef.current, dimension);
    };

    _this.handleEntered = function () {
      _this.childRef.current.style[_this.getDimension()] = null;
    };

    _this.handleExit = function () {
      var dimension = _this.getDimension();

      _this.childRef.current.style[dimension] = _this.props.getDimensionValue(dimension, _this.childRef.current) + "px";
      triggerBrowserReflow(_this.childRef.current);
    };

    _this.handleExiting = function () {
      _this.childRef.current.style[_this.getDimension()] = '0';
    };

    _this.childRef = React.createRef();
    return _this;
  }

  var _proto = Collapse.prototype;

  _proto.getDimension = function getDimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  }; // for testing


  _proto._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
    return elem["scroll" + capitalize(dimension)] + "px";
  };
  /* -- Expanding -- */


  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        onEnter = _this$props.onEnter,
        onEntering = _this$props.onEntering,
        onEntered = _this$props.onEntered,
        onExit = _this$props.onExit,
        onExiting = _this$props.onExiting,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "className", "children"]);

    delete props.dimension;
    delete props.getDimensionValue;
    var handleEnter = createChainedFunction(this.handleEnter, onEnter);
    var handleEntering = createChainedFunction(this.handleEntering, onEntering);
    var handleEntered = createChainedFunction(this.handleEntered, onEntered);
    var handleExit = createChainedFunction(this.handleExit, onExit);
    var handleExiting = createChainedFunction(this.handleExiting, onExiting);

    var ref = function ref(c) {
      _this2.childRef.current = c;
    };

    ref = createChainedFunction(children.props.ref, ref);
    return React.createElement(Transition, _extends({}, props, {
      "aria-expanded": props.role ? props.in : null,
      nodeRef: this.childRef,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: handleEntered,
      onExit: handleExit,
      onExiting: handleExiting
    }), function (state, innerProps) {
      return React.cloneElement(children, _extends({}, innerProps, {
        ref: ref,
        className: classNames(className, children.props.className, collapseStyles[state], _this2.getDimension() === 'width' && 'width')
      }));
    });
  };

  return Collapse;
}(React.Component);

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;
export default Collapse;