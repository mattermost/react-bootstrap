// TODO: The publicly exposed parts of this should be in lib/BootstrapUtils.

import invariant from 'invariant';
import { isValidElementType } from 'react-is';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';

import { SIZE_MAP } from './StyleConfig';

const DEV = process.env.NODE_ENV !== 'production';

function curry(fn) {
  return (...args) => {
    let last = args[args.length - 1];
    if (typeof last !== 'string' && isValidElementType(last)) {
      // Supports calling curry(...args, Component)
      return fn(...args);
    }

    // Supports calling curry(...args)(Component)
    return Component => fn(...args, Component);
  };
}

function componentName(Component) {
  return Component.displayName || Component.name || 'Component';
}

function getComponentType(Component) {
  if (
    Component &&
    Component.prototype &&
    typeof Component.prototype.render === 'function'
  ) {
    return 'class';
  } else if (typeof Component === 'function') {
    return 'function';
  }

  // Component is likely a forwardRef component
  return 'other';
}

function warnOutOfRange(name, propName, value, allowed) {
  if (value != null && allowed.indexOf(value) === -1) {
    warning(
      value == null || allowed.indexOf(value) !== -1,
      `Invalid prop \`${propName}\` of value \`${value}\` supplied to ` +
        `\`${name}\`, expected one of ${JSON.stringify(allowed)}.`
    );
  }
}

/**
 * Patches a class component's `render` method to validate the given prop value,
 * mirroring how prop-types validation works before React 19.
 */
function patchRenderValidation(Component, { propName, allowed }) {
  if (allowed) {
    const name = componentName(Component);
    const innerRender = Component.prototype.render;

    Component.prototype.render = function validatedRender(...renderArgs) {
      warnOutOfRange(name, propName, this.props[propName], allowed);
      return innerRender.apply(this, renderArgs);
    };
  }

  return Component;
}

/**
 * Adds a default prop value to a non-function component.
 */
function addDefaultProp(Component, { propName, defaultValue }) {
  if (defaultValue !== undefined) {
    Component.defaultProps = {
      ...Component.defaultProps,
      [propName]: defaultValue
    };
  }

  return Component;
}

/**
 * Adds a default prop value to a function component and adds development-only
 * warning messages when allowed is provided.
 */
function wrapFunctionComponent(Component, { propName, defaultValue, allowed }) {
  if (defaultValue === undefined && !allowed) {
    return Component;
  }

  const name = componentName(Component);

  function WrappedComponent(props) {
    const resolved =
      defaultValue !== undefined && props[propName] === undefined
        ? { ...props, [propName]: defaultValue }
        : props;

    if (allowed) {
      warnOutOfRange(name, propName, resolved[propName], allowed);
    }

    return React.createElement(Component, resolved);
  }

  WrappedComponent.displayName = name;

  // Carry over metadata read elsewhere: `propTypes`/`_values` for docs and
  // `STYLES`/`SIZES` for decorator chaining.
  if (Component.propTypes) WrappedComponent.propTypes = Component.propTypes;
  if (Component.STYLES) WrappedComponent.STYLES = Component.STYLES;
  if (Component.SIZES) WrappedComponent.SIZES = Component.SIZES;

  return WrappedComponent;
}

/**
 * Applies a default prop value and optional, development-only validation
 * messages to the given Component.
 */
function applyBsProp(Component, options) {
  const componentType = getComponentType(Component);

  if (!DEV && options.allowed) {
    // Only validate this prop during development
    options.allowed = undefined;
  }

  switch (componentType) {
    case 'class':
      Component = addDefaultProp(Component, options);
      Component = patchRenderValidation(Component, options);
      break;
    case 'function':
      Component = wrapFunctionComponent(Component, options);
      break;
    default:
      // No prop validation is added for forwardRef components
      Component = addDefaultProp(Component, options);
      break;
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
