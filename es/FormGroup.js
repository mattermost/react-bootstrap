import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import FormGroupContext from './FormGroupContext';
import { bsClass, bsSizes, getClassSet, splitBsPropsAndOmit } from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';
import ValidComponentChildren from './utils/ValidComponentChildren';
var propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: PropTypes.string,
  validationState: PropTypes.oneOf(['success', 'warning', 'error', null])
};

var FormGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormGroup, _React$Component);

  function FormGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormGroup.prototype;

  _proto.hasFeedback = function hasFeedback(children) {
    var _this = this;

    return ValidComponentChildren.some(children, function (child) {
      return child.props.bsRole === 'feedback' || child.props.children && _this.hasFeedback(child.props.children);
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        validationState = _this$props.validationState,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["validationState", "className", "children"]);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['controlId']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var classes = _extends({}, getClassSet(bsProps), {
      'has-feedback': this.hasFeedback(children)
    });

    if (validationState) {
      classes["has-" + validationState] = true;
    }

    return React.createElement(FormGroupContext.Provider, {
      value: {
        controlId: this.props.controlId,
        validationState: validationState
      }
    }, React.createElement("div", _extends({}, elementProps, {
      className: classNames(className, classes)
    }), children));
  };

  return FormGroup;
}(React.Component);

FormGroup.propTypes = propTypes;
export default bsClass('form-group', bsSizes([Size.LARGE, Size.SMALL], FormGroup));