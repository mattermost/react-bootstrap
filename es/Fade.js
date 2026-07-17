import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";

var _fadeStyles;

import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Transition, { ENTERED, ENTERING } from 'react-transition-group/Transition';
import createChainedFunction from './utils/createChainedFunction';
var propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: PropTypes.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: PropTypes.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the has component faded in
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the component fades out
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the component has faded out
   */
  onExited: PropTypes.func
};
var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[ENTERING] = 'in', _fadeStyles[ENTERED] = 'in', _fadeStyles);

var Fade =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Fade, _React$Component);

  function Fade(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.childRef = React.createRef();
    return _this;
  }

  var _proto = Fade.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "children"]);

    var ref = function ref(c) {
      _this2.childRef.current = c;
    };

    ref = createChainedFunction(children.props.ref, ref);
    return React.createElement(Transition, _extends({}, props, {
      nodeRef: this.childRef
    }), function (status, innerProps) {
      return React.cloneElement(children, _extends({}, innerProps, {
        ref: ref,
        className: classNames('fade', className, children.props.className, fadeStyles[status])
      }));
    });
  };

  return Fade;
}(React.Component);

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;
export default Fade;