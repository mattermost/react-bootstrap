"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor");
var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");
var _WeakMap = require("@babel/runtime-corejs2/core-js/weak-map");
exports.__esModule = true;
exports["default"] = void 0;
var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _bootstrapUtils = require("./utils/bootstrapUtils");
var _StyleConfig = require("./utils/StyleConfig");
var _excluded = ["active", "disabled", "className", "header", "listItem", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof _WeakMap) var r = new _WeakMap(), n = new _WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
var propTypes = {
  active: _propTypes["default"].any,
  disabled: _propTypes["default"].any,
  header: _propTypes["default"].node,
  listItem: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  href: _propTypes["default"].string,
  type: _propTypes["default"].string
};
var defaultProps = {
  listItem: false
};
var ListGroupItem = /*#__PURE__*/function (_React$Component) {
  function ListGroupItem() {
    return _React$Component.apply(this, arguments) || this;
  }
  (0, _inheritsLoose2["default"])(ListGroupItem, _React$Component);
  var _proto = ListGroupItem.prototype;
  _proto.renderHeader = function renderHeader(header, headingClassName) {
    if (_react["default"].isValidElement(header)) {
      return (0, _react.cloneElement)(header, {
        className: (0, _classnames["default"])(header.props.className, headingClassName)
      });
    }
    return _react["default"].createElement("h4", {
      className: headingClassName
    }, header);
  };
  _proto.render = function render() {
    var _this$props = this.props,
      active = _this$props.active,
      disabled = _this$props.disabled,
      className = _this$props.className,
      header = _this$props.header,
      listItem = _this$props.listItem,
      children = _this$props.children,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
      bsProps = _splitBsProps[0],
      elementProps = _splitBsProps[1];
    var classes = (0, _extends2["default"])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
      active: active,
      disabled: disabled
    });
    var Component;
    if (elementProps.href) {
      Component = 'a';
    } else if (elementProps.onClick) {
      Component = 'button';
      elementProps.type = elementProps.type || 'button';
    } else if (listItem) {
      Component = 'li';
    } else {
      Component = 'span';
    }
    elementProps.className = (0, _classnames["default"])(className, classes);

    // TODO: Deprecate `header` prop.
    if (header) {
      return _react["default"].createElement(Component, elementProps, this.renderHeader(header, (0, _bootstrapUtils.prefix)(bsProps, 'heading')), _react["default"].createElement("p", {
        className: (0, _bootstrapUtils.prefix)(bsProps, 'text')
      }, children));
    }
    return _react["default"].createElement(Component, elementProps, children);
  };
  return ListGroupItem;
}(_react["default"].Component);
ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;
var _default = exports["default"] = (0, _bootstrapUtils.bsClass)('list-group-item', (0, _bootstrapUtils.bsStyles)((0, _values["default"])(_StyleConfig.State), ListGroupItem));
module.exports = exports["default"];