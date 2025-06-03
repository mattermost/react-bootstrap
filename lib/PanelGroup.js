"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor");
var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");
var _WeakMap = require("@babel/runtime-corejs2/core-js/weak-map");
exports.__esModule = true;
exports["default"] = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _uncontrollable = _interopRequireDefault(require("uncontrollable"));
var _bootstrapUtils = require("./utils/bootstrapUtils");
var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));
var _PropTypes = require("./utils/PropTypes");
var _excluded = ["accordion", "className", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof _WeakMap) var r = new _WeakMap(), n = new _WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
var propTypes = {
  accordion: _propTypes["default"].bool,
  /**
   * When `accordion` is enabled, `activeKey` controls the which child `Panel` is expanded. `activeKey` should
   * match a child Panel `eventKey` prop exactly.
   *
   * @controllable onSelect
   */
  activeKey: _propTypes["default"].any,
  /**
   * A callback fired when a child Panel collapse state changes. It's called with the next expanded `activeKey`
   *
   * @controllable activeKey
   */
  onSelect: _propTypes["default"].func,
  /**
   * An HTML role attribute
   */
  role: _propTypes["default"].string,
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
  generateChildId: _propTypes["default"].func,
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: (0, _PropTypes.generatedId)('PanelGroup')
};
var defaultProps = {
  accordion: false
};
var childContextTypes = {
  $bs_panelGroup: _propTypes["default"].shape({
    getId: _propTypes["default"].func,
    headerRole: _propTypes["default"].string,
    panelRole: _propTypes["default"].string,
    activeKey: _propTypes["default"].any,
    onToggle: _propTypes["default"].func
  })
};
var PanelGroup = /*#__PURE__*/function (_React$Component) {
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
  (0, _inheritsLoose2["default"])(PanelGroup, _React$Component);
  var _proto = PanelGroup.prototype;
  _proto.getChildContext = function getChildContext() {
    var _this$props = this.props,
      activeKey = _this$props.activeKey,
      accordion = _this$props.accordion,
      generateChildId = _this$props.generateChildId,
      id = _this$props.id;
    var getId = null;
    if (accordion) {
      getId = generateChildId || function (key, type) {
        return id ? id + "-" + type + "-" + key : null;
      };
    }
    return {
      $bs_panelGroup: (0, _extends2["default"])({
        getId: getId,
        headerRole: 'tab',
        panelRole: 'tabpanel'
      }, accordion && {
        activeKey: activeKey,
        onToggle: this.handleSelect
      })
    };
  };
  _proto.render = function render() {
    var _this$props2 = this.props,
      accordion = _this$props2.accordion,
      className = _this$props2.className,
      children = _this$props2.children,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props2, _excluded);
    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['onSelect', 'activeKey']),
      bsProps = _splitBsPropsAndOmit[0],
      elementProps = _splitBsPropsAndOmit[1];
    if (accordion) {
      elementProps.role = elementProps.role || 'tablist';
    }
    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react["default"].createElement("div", (0, _extends2["default"])({}, elementProps, {
      className: (0, _classnames["default"])(className, classes)
    }), _ValidComponentChildren["default"].map(children, function (child) {
      return (0, _react.cloneElement)(child, {
        bsStyle: child.props.bsStyle || bsProps.bsStyle
      });
    }));
  };
  return PanelGroup;
}(_react["default"].Component);
PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;
PanelGroup.childContextTypes = childContextTypes;
var _default = exports["default"] = (0, _uncontrollable["default"])((0, _bootstrapUtils.bsClass)('panel-group', PanelGroup), {
  activeKey: 'onSelect'
});
module.exports = exports["default"];