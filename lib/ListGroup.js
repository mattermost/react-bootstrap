"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor");
var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");
var _WeakMap = require("@babel/runtime-corejs2/core-js/weak-map");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));
var _ListGroupItem = _interopRequireDefault(require("./ListGroupItem"));
var _bootstrapUtils = require("./utils/bootstrapUtils");
var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));
var _excluded = ["children", "componentClass", "className"];
function _interopRequireWildcard(e, t) { if ("function" == typeof _WeakMap) var r = new _WeakMap(), n = new _WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
var propTypes = {
  /**
   * You can use a custom element type for this component.
   *
   * If not specified, it will be treated as `'li'` if every child is a
   * non-actionable `<ListGroupItem>`, and `'div'` otherwise.
   */
  componentClass: _elementType["default"]
};
function getDefaultComponent(children) {
  if (!children) {
    // FIXME: This is the old behavior. Is this right?
    return 'div';
  }
  if (_ValidComponentChildren["default"].some(children, function (child) {
    return child.type !== _ListGroupItem["default"] || child.props.href || child.props.onClick;
  })) {
    return 'div';
  }
  return 'ul';
}
var ListGroup = /*#__PURE__*/function (_React$Component) {
  function ListGroup() {
    return _React$Component.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(ListGroup, _React$Component);
  var _proto = ListGroup.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      children = _this$props.children,
      _this$props$component = _this$props.componentClass,
      Component = _this$props$component === void 0 ? getDefaultComponent(children) : _this$props$component,
      className = _this$props.className,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];
    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    var useListItem = Component === 'ul' && _ValidComponentChildren["default"].every(children, function (child) {
      return child.type === _ListGroupItem["default"];
    });
    return _react["default"].createElement(Component, (0, _extends2["default"])({}, elementProps, {
      className: (0, _classnames["default"])(className, classes)
    }), useListItem ? _ValidComponentChildren["default"].map(children, function (child) {
      return (0, _react.cloneElement)(child, {
        listItem: true
      });
    }) : children);
  };
  return ListGroup;
}(_react["default"].Component);
ListGroup.propTypes = propTypes;
var _default = exports["default"] = (0, _bootstrapUtils.bsClass)('list-group', ListGroup);
module.exports = exports["default"];