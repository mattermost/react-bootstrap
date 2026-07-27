"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.prefix = prefix;
exports.getClassSet = getClassSet;
exports.splitBsProps = splitBsProps;
exports.splitBsPropsAndOmit = splitBsPropsAndOmit;
exports.addStyle = addStyle;
exports._curry = exports.bsSizes = exports.bsStyles = exports.bsClass = void 0;

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _extends4 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _invariant = _interopRequireDefault(require("invariant"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _warning = _interopRequireDefault(require("warning"));

var _StyleConfig = require("./StyleConfig");

// TODO: The publicly exposed parts of this should be in lib/BootstrapUtils.
function curry(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var last = args[args.length - 1];

    if (typeof last === 'function') {
      return fn.apply(void 0, args);
    }

    return function (Component) {
      return fn.apply(void 0, args.concat([Component]));
    };
  };
}

function componentName(Component) {
  return Component.displayName || Component.name || 'Component';
}

function isReactClass(Component) {
  return Boolean(Component && Component.prototype && typeof Component.prototype.render === 'function');
}

function warnOutOfRange(name, propName, value, allowed) {
  if (value != null && allowed.indexOf(value) === -1) {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, "Invalid prop `" + propName + "` of value `" + value + "` supplied to " + ("`" + name + "`, expected one of " + (0, _stringify.default)(allowed) + ".")) : void 0;
  }
} // Patch a class component's `render` so `propName` is validated on every
// render, without wrapping the component (which would break ref forwarding,
// static reads, and — for e.g. `bsRole` — class `defaultProps` merging).


function patchRenderValidation(Component, propName, allowed) {
  var flag = "__bsValidated_" + propName;
  var proto = Component.prototype;

  if (Object.prototype.hasOwnProperty.call(proto, flag)) {
    return;
  }

  var name = componentName(Component);
  var innerRender = proto.render;

  proto.render = function validatedRender() {
    warnOutOfRange(name, propName, this.props[propName], allowed);

    for (var _len2 = arguments.length, renderArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      renderArgs[_key2] = arguments[_key2];
    }

    return innerRender.apply(this, renderArgs);
  };

  proto[flag] = true;
} // Wrap a function component so the default is applied and the value validated
// at render.


function wrapFunctionComponent(Inner, _ref) {
  var propName = _ref.propName,
      defaultValue = _ref.defaultValue,
      allowed = _ref.allowed;
  var name = componentName(Inner);

  function BootstrapComponent(props) {
    var _extends2;

    var resolved = defaultValue !== undefined && props[propName] === undefined ? (0, _extends4.default)({}, props, (_extends2 = {}, _extends2[propName] = defaultValue, _extends2)) : props;

    if (allowed) {
      warnOutOfRange(name, propName, resolved[propName], allowed);
    }

    return _react.default.createElement(Inner, resolved);
  }

  BootstrapComponent.displayName = name; // Carry over metadata read elsewhere: `propTypes`/`_values` for docs and
  // `STYLES`/`SIZES` for decorator chaining.

  if (Inner.propTypes) BootstrapComponent.propTypes = Inner.propTypes;
  if (Inner.STYLES) BootstrapComponent.STYLES = Inner.STYLES;
  if (Inner.SIZES) BootstrapComponent.SIZES = Inner.SIZES;
  return BootstrapComponent;
} // Apply a `bs*` default and (optionally) enum validation to a component,
// dispatching on what kind of thing it is. Class components keep working
// `defaultProps`; function components get a validating wrapper; anything else
// (e.g. a plain object in tests) just records the default.


function applyBsProp(Component, _ref2) {
  var propName = _ref2.propName,
      defaultValue = _ref2.defaultValue,
      allowed = _ref2.allowed;
  var isClassComponent = isReactClass(Component);

  if (typeof Component === 'function' && !isClassComponent) {
    return wrapFunctionComponent(Component, {
      propName: propName,
      defaultValue: defaultValue,
      allowed: allowed
    });
  }

  if (defaultValue !== undefined) {
    var _extends3;

    Component.defaultProps = (0, _extends4.default)({}, Component.defaultProps, (_extends3 = {}, _extends3[propName] = defaultValue, _extends3));
  }

  if (allowed && isClassComponent) {
    patchRenderValidation(Component, propName, allowed);
  }

  return Component;
}

function prefix(props, variant) {
  var bsClass = (props.bsClass || '').trim();
  !(bsClass != null) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'A `bsClass` prop is required for this component') : invariant(false) : void 0;
  return bsClass + (variant ? "-" + variant : '');
}

var bsClass = curry(function (defaultClass, Component) {
  var propTypes = Component.propTypes || (Component.propTypes = {});
  propTypes.bsClass = _propTypes.default.string;
  return applyBsProp(Component, {
    propName: 'bsClass',
    defaultValue: defaultClass
  });
});
exports.bsClass = bsClass;
var bsStyles = curry(function (styles, defaultStyle, Component) {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  var existing = Component.STYLES || [];
  var propTypes = Component.propTypes || {};
  styles.forEach(function (style) {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  var propType = _propTypes.default.oneOf(existing); // expose the values on the propType function for documentation


  Component.STYLES = existing;
  propType._values = existing;
  Component.propTypes = (0, _extends4.default)({}, propTypes, {
    bsStyle: propType
  });
  return applyBsProp(Component, {
    propName: 'bsStyle',
    defaultValue: defaultStyle,
    allowed: existing
  });
});
exports.bsStyles = bsStyles;
var bsSizes = curry(function (sizes, defaultSize, Component) {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  var existing = Component.SIZES || [];
  var propTypes = Component.propTypes || {};
  sizes.forEach(function (size) {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });
  var values = [];
  existing.forEach(function (size) {
    var mappedSize = _StyleConfig.SIZE_MAP[size];

    if (mappedSize && mappedSize !== size) {
      values.push(mappedSize);
    }

    values.push(size);
  });

  var propType = _propTypes.default.oneOf(values);

  propType._values = values; // expose the values on the propType function for documentation

  Component.SIZES = existing;
  Component.propTypes = (0, _extends4.default)({}, propTypes, {
    bsSize: propType
  });
  return applyBsProp(Component, {
    propName: 'bsSize',
    defaultValue: defaultSize,
    allowed: values
  });
});
exports.bsSizes = bsSizes;

function getClassSet(props) {
  var _classes;

  var classes = (_classes = {}, _classes[prefix(props)] = true, _classes);

  if (props.bsSize) {
    var bsSize = _StyleConfig.SIZE_MAP[props.bsSize] || props.bsSize;
    classes[prefix(props, bsSize)] = true;
  }

  if (props.bsStyle) {
    classes[prefix(props, props.bsStyle)] = true;
  }

  return classes;
}

function getBsProps(props) {
  return {
    bsClass: props.bsClass,
    bsSize: props.bsSize,
    bsStyle: props.bsStyle,
    bsRole: props.bsRole
  };
}

function isBsProp(propName) {
  return propName === 'bsClass' || propName === 'bsSize' || propName === 'bsStyle' || propName === 'bsRole';
}

function splitBsProps(props) {
  var elementProps = {};
  (0, _entries.default)(props).forEach(function (_ref3) {
    var propName = _ref3[0],
        propValue = _ref3[1];

    if (!isBsProp(propName)) {
      elementProps[propName] = propValue;
    }
  });
  return [getBsProps(props), elementProps];
}

function splitBsPropsAndOmit(props, omittedPropNames) {
  var isOmittedProp = {};
  omittedPropNames.forEach(function (propName) {
    isOmittedProp[propName] = true;
  });
  var elementProps = {};
  (0, _entries.default)(props).forEach(function (_ref4) {
    var propName = _ref4[0],
        propValue = _ref4[1];

    if (!isBsProp(propName) && !isOmittedProp[propName]) {
      elementProps[propName] = propValue;
    }
  });
  return [getBsProps(props), elementProps];
}
/**
 * Add a style variant to a Component. Mutates the propTypes of the component
 * in order to validate the new variant.
 */


function addStyle(Component) {
  for (var _len3 = arguments.length, styleVariant = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    styleVariant[_key3 - 1] = arguments[_key3];
  }

  bsStyles(styleVariant, Component);
}

var _curry = curry;
exports._curry = _curry;