// TODO: The publicly exposed parts of this should be in lib/BootstrapUtils.

import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';

import { SIZE_MAP } from './StyleConfig';

function curry(fn) {
  return (...args) => {
    let last = args[args.length - 1];
    if (typeof last === 'function') {
      return fn(...args);
    }
    return Component => fn(...args, Component);
  };
}

function componentName(Component) {
  return Component.displayName || Component.name || 'Component';
}

function isReactClass(Component) {
  return Boolean(
    Component &&
      Component.prototype &&
      typeof Component.prototype.render === 'function'
  );
}

function warnOutOfRange(name, propName, value, allowed) {
  if (value != null && allowed.indexOf(value) === -1) {
    warning(
      false,
      `Invalid prop \`${propName}\` of value \`${value}\` supplied to ` +
        `\`${name}\`, expected one of ${JSON.stringify(allowed)}.`
    );
  }
}

// Patch a class component's `render` so `propName` is validated on every
// render, without wrapping the component (which would break ref forwarding,
// static reads, and — for e.g. `bsRole` — class `defaultProps` merging).
function patchRenderValidation(Component, propName, allowed) {
  const flag = `__bsValidated_${propName}`;
  const proto = Component.prototype;

  if (Object.prototype.hasOwnProperty.call(proto, flag)) {
    return;
  }

  const name = componentName(Component);
  const innerRender = proto.render;

  proto.render = function validatedRender(...renderArgs) {
    warnOutOfRange(name, propName, this.props[propName], allowed);
    return innerRender.apply(this, renderArgs);
  };
  proto[flag] = true;
}

// Wrap a function component so the default is applied and the value validated
// at render.
function wrapFunctionComponent(Inner, { propName, defaultValue, allowed }) {
  const name = componentName(Inner);

  function BootstrapComponent(props) {
    const resolved =
      defaultValue !== undefined && props[propName] === undefined
        ? { ...props, [propName]: defaultValue }
        : props;

    if (allowed) {
      warnOutOfRange(name, propName, resolved[propName], allowed);
    }

    return React.createElement(Inner, resolved);
  }

  BootstrapComponent.displayName = name;

  // Carry over metadata read elsewhere: `propTypes`/`_values` for docs and
  // `STYLES`/`SIZES` for decorator chaining.
  if (Inner.propTypes) BootstrapComponent.propTypes = Inner.propTypes;
  if (Inner.STYLES) BootstrapComponent.STYLES = Inner.STYLES;
  if (Inner.SIZES) BootstrapComponent.SIZES = Inner.SIZES;

  return BootstrapComponent;
}

// Apply a `bs*` default and (optionally) enum validation to a component,
// dispatching on what kind of thing it is. Class components keep working
// `defaultProps`; function components get a validating wrapper; anything else
// (e.g. a plain object in tests) just records the default.
function applyBsProp(Component, { propName, defaultValue, allowed }) {
  const isClassComponent = isReactClass(Component);

  if (typeof Component === 'function' && !isClassComponent) {
    return wrapFunctionComponent(Component, {
      propName,
      defaultValue,
      allowed
    });
  }

  if (defaultValue !== undefined) {
    Component.defaultProps = {
      ...Component.defaultProps,
      [propName]: defaultValue
    };
  }

  if (allowed && isClassComponent) {
    patchRenderValidation(Component, propName, allowed);
  }

  return Component;
}

export function prefix(props, variant) {
  let bsClass = (props.bsClass || '').trim();
  invariant(bsClass != null, 'A `bsClass` prop is required for this component');
  return bsClass + (variant ? `-${variant}` : '');
}

export const bsClass = curry((defaultClass, Component) => {
  let propTypes = Component.propTypes || (Component.propTypes = {});

  propTypes.bsClass = PropTypes.string;

  return applyBsProp(Component, {
    propName: 'bsClass',
    defaultValue: defaultClass
  });
});

export const bsStyles = curry((styles, defaultStyle, Component) => {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  let existing = Component.STYLES || [];
  let propTypes = Component.propTypes || {};

  styles.forEach(style => {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  let propType = PropTypes.oneOf(existing);

  // expose the values on the propType function for documentation
  Component.STYLES = existing;
  propType._values = existing;

  Component.propTypes = {
    ...propTypes,
    bsStyle: propType
  };

  return applyBsProp(Component, {
    propName: 'bsStyle',
    defaultValue: defaultStyle,
    allowed: existing
  });
});

export const bsSizes = curry((sizes, defaultSize, Component) => {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  let existing = Component.SIZES || [];
  let propTypes = Component.propTypes || {};

  sizes.forEach(size => {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });

  const values = [];
  existing.forEach(size => {
    const mappedSize = SIZE_MAP[size];
    if (mappedSize && mappedSize !== size) {
      values.push(mappedSize);
    }

    values.push(size);
  });

  const propType = PropTypes.oneOf(values);
  propType._values = values;

  // expose the values on the propType function for documentation
  Component.SIZES = existing;

  Component.propTypes = {
    ...propTypes,
    bsSize: propType
  };

  return applyBsProp(Component, {
    propName: 'bsSize',
    defaultValue: defaultSize,
    allowed: values
  });
});

export function getClassSet(props) {
  const classes = {
    [prefix(props)]: true
  };

  if (props.bsSize) {
    const bsSize = SIZE_MAP[props.bsSize] || props.bsSize;
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
  return (
    propName === 'bsClass' ||
    propName === 'bsSize' ||
    propName === 'bsStyle' ||
    propName === 'bsRole'
  );
}

export function splitBsProps(props) {
  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    if (!isBsProp(propName)) {
      elementProps[propName] = propValue;
    }
  });

  return [getBsProps(props), elementProps];
}

export function splitBsPropsAndOmit(props, omittedPropNames) {
  const isOmittedProp = {};
  omittedPropNames.forEach(propName => {
    isOmittedProp[propName] = true;
  });

  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
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
export function addStyle(Component, ...styleVariant) {
  bsStyles(styleVariant, Component);
}

export const _curry = curry;
