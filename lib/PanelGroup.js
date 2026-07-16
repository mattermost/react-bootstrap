"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _PanelGroupContext = _interopRequireDefault(require("./PanelGroupContext"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

var _PropTypes = require("./utils/PropTypes");

var propTypes = {
  accordion: _propTypes.default.bool,

  /**
   * When `accordion` is enabled, `activeKey` controls the which child `Panel` is expanded. `activeKey` should
   * match a child Panel `eventKey` prop exactly.
   *
   * @controllable onSelect
   */
  activeKey: _propTypes.default.any,

  /**
   * A callback fired when a child Panel collapse state changes. It's called with the next expanded `activeKey`
   *
   * @controllable activeKey
   */
  onSelect: _propTypes.default.func,

  /**
   * An HTML role attribute
   */
  role: _propTypes.default.string,

  /**
   * A function that takes an eventKey and type and returns a
   * unique id for each Panel heading and Panel Collapse. The function _must_ be a pure function,
   * meaning it should always return the _same_ id for the same set of inputs. The default
   * value requires that an `id` to be set for the PanelGroup.
   *
   * The `type` argument will either be `"body"` or `"heading"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: _propTypes.default.func,

  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: (0, _PropTypes.generatedId)('PanelGroup')
};
var defaultProps = {
  accordion: false
};

var PanelGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PanelGroup, _React$Component);

  function PanelGroup() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleSelect = function (key, expanded, e) {
      if (expanded) {
        _this.props.onSelect(key, e);
      } else if (_this.props.activeKey === key) {
        _this.props.onSelect(null, e);
      }
    };

    return _this;
  }

  var _proto = PanelGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        accordion = _this$props.accordion,
        className = _this$props.className,
        children = _this$props.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["accordion", "className", "children"]);

    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['onSelect', 'activeKey']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    if (accordion) {
      elementProps.role = elementProps.role || 'tablist';
    }

    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    var _this$props2 = this.props,
        activeKey = _this$props2.activeKey,
        generateChildId = _this$props2.generateChildId,
        id = _this$props2.id;
    var getId = null;

    if (accordion) {
      getId = generateChildId || function (key, type) {
        return id ? id + "-" + type + "-" + key : null;
      };
    }

    var panelGroupContext = (0, _extends2.default)({
      getId: getId,
      headerRole: 'tab',
      panelRole: 'tabpanel'
    }, accordion && {
      activeKey: activeKey,
      onToggle: this.handleSelect
    });
    return _react.default.createElement(_PanelGroupContext.default.Provider, {
      value: panelGroupContext
    }, _react.default.createElement("div", (0, _extends2.default)({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), _ValidComponentChildren.default.map(children, function (child) {
      return (0, _react.cloneElement)(child, {
        bsStyle: child.props.bsStyle || bsProps.bsStyle
      });
    })));
  };

  return PanelGroup;
}(_react.default.Component);

PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;

var _default = (0, _uncontrollable.default)((0, _bootstrapUtils.bsClass)('panel-group', PanelGroup), {
  activeKey: 'onSelect'
});

exports.default = _default;
module.exports = exports["default"];