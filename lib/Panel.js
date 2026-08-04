"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inheritsLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _warning = _interopRequireDefault(require("warning"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

var _PanelBody = _interopRequireDefault(require("./PanelBody"));

var _PanelContext = _interopRequireDefault(require("./PanelContext"));

var _PanelGroupContext = _interopRequireDefault(require("./PanelGroupContext"));

var _PanelHeading = _interopRequireDefault(require("./PanelHeading"));

var _PanelTitle = _interopRequireDefault(require("./PanelTitle"));

var _PanelFooter = _interopRequireDefault(require("./PanelFooter"));

var _PanelToggle = _interopRequireDefault(require("./PanelToggle"));

var _PanelCollapse = _interopRequireDefault(require("./PanelCollapse"));

var has = Object.prototype.hasOwnProperty;

var defaultGetId = function defaultGetId(id, type) {
  return id ? id + "--" + type : null;
};

var propTypes = {
  /**
   * Controls the collapsed/expanded state ofthe Panel. Requires
   * a `Panel.Collapse` or `<Panel.Body collapsible>` child component
   * in order to actually animate out or in.
   *
   * @controllable onToggle
   */
  expanded: _propTypes.default.bool,

  /**
   * A callback fired when the collapse state changes.
   *
   * @controllable expanded
   */
  onToggle: _propTypes.default.func,
  eventKey: _propTypes.default.any,

  /**
   * An HTML `id` attribute uniquely identifying the Panel component.
   */
  id: _propTypes.default.string
};

var Panel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Panel, _React$Component);

  function Panel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleToggle = function (e) {
      var panelGroup = _this.context;
      var expanded = !_this.getExpanded();

      if (panelGroup && panelGroup.onToggle) {
        panelGroup.onToggle(_this.props.eventKey, expanded, e);
      } else {
        _this.props.onToggle(expanded, e);
      }
    };

    return _this;
  }

  var _proto = Panel.prototype;

  _proto.getExpanded = function getExpanded() {
    var panelGroup = this.context;

    if (panelGroup && has.call(panelGroup, 'activeKey')) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(this.props.expanded == null, 'Specifying `<Panel>` `expanded` in the context of an accordion ' + '`<PanelGroup>` is not supported. Set `activeKey` on the ' + '`<PanelGroup>` instead.') : void 0;
      return panelGroup.activeKey === this.props.eventKey;
    }

    return !!this.props.expanded;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children;

    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(this.props, ['onToggle', 'eventKey', 'expanded']),
        bsProps = _splitBsPropsAndOmit[0],
        props = _splitBsPropsAndOmit[1];

    var _this$props2 = this.props,
        eventKey = _this$props2.eventKey,
        id = _this$props2.id;
    var idKey = eventKey == null ? id : eventKey;
    var ids;

    if (idKey !== null) {
      var panelGroup = this.context;
      var getId = panelGroup && panelGroup.getId || defaultGetId;
      ids = {
        headingId: getId(idKey, 'heading'),
        bodyId: getId(idKey, 'body')
      };
    }

    var panelContext = (0, _extends2.default)({}, ids, {
      bsClass: this.props.bsClass,
      expanded: this.getExpanded(),
      onToggle: this.handleToggle
    });
    return _react.default.createElement(_PanelContext.default.Provider, {
      value: panelContext
    }, _react.default.createElement("div", (0, _extends2.default)({}, props, {
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.getClassSet)(bsProps))
    }), children));
  };

  return Panel;
}(_react.default.Component);

Panel.propTypes = propTypes;
Panel.contextType = _PanelGroupContext.default;
var UncontrolledPanel = (0, _uncontrollable.default)((0, _bootstrapUtils.bsClass)('panel', (0, _bootstrapUtils.bsStyles)((0, _values.default)(_StyleConfig.State).concat([_StyleConfig.Style.DEFAULT, _StyleConfig.Style.PRIMARY]), _StyleConfig.Style.DEFAULT, Panel)), {
  expanded: 'onToggle'
});
(0, _assign.default)(UncontrolledPanel, {
  Heading: _PanelHeading.default,
  Title: _PanelTitle.default,
  Body: _PanelBody.default,
  Footer: _PanelFooter.default,
  Toggle: _PanelToggle.default,
  Collapse: _PanelCollapse.default
});
var _default = UncontrolledPanel;
exports.default = _default;
module.exports = exports["default"];