"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormGroupContext = _interopRequireDefault(require("./FormGroupContext"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

var propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: _propTypes.default.string,
  validationState: _propTypes.default.oneOf(['success', 'warning', 'error', null])
};

var FormGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FormGroup, _React$Component);

  function FormGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormGroup.prototype;

  _proto.hasFeedback = function hasFeedback(children) {
    var _this = this;

    return _ValidComponentChildren.default.some(children, function (child) {
      return child.props.bsRole === 'feedback' || child.props.children && _this.hasFeedback(child.props.children);
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        validationState = _this$props.validationState,
        className = _this$props.className,
        children = _this$props.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["validationState", "className", "children"]);

    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['controlId']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var classes = (0, _extends2.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
      'has-feedback': this.hasFeedback(children)
    });

    if (validationState) {
      classes["has-" + validationState] = true;
    }

    return _react.default.createElement(_FormGroupContext.default.Provider, {
      value: {
        controlId: this.props.controlId,
        validationState: validationState
      }
    }, _react.default.createElement("div", (0, _extends2.default)({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), children));
  };

  return FormGroup;
}(_react.default.Component);

FormGroup.propTypes = propTypes;

var _default = (0, _bootstrapUtils.bsClass)('form-group', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], FormGroup));

exports.default = _default;
module.exports = exports["default"];