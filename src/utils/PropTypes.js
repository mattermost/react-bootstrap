import PropTypes from 'prop-types';

import ValidComponentChildren from './ValidComponentChildren';

const idPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export function generatedId(name) {
  return (props, ...args) => {
    let error = null;

    if (!props.generateChildId) {
      error = idPropType(props, ...args);

      if (!error && !props.id) {
        error = new Error(
          `In order to properly initialize the ${name} in a way that is accessible to assistive technologies ` +
            `(such as screen readers) an \`id\` or a \`generateChildId\` prop to ${name} is required`
        );
      }
    }
    return error;
  };
}

/**
 * Return a warning message if `children` is missing a child for any of the
 * required `roles`, otherwise `null`. `bsRole` is matched against each child's
 * `bsRole` prop.
 */
export function getMissingRoleError(component, children, ...roles) {
  let missing;

  roles.every(role => {
    if (
      !ValidComponentChildren.some(
        children,
        child => child.props.bsRole === role
      )
    ) {
      missing = role;
      return false;
    }

    return true;
  });

  if (missing) {
    return (
      `(children) ${component} - Missing a required child with bsRole: ` +
      `${missing}. ${component} must have at least one child of each of ` +
      `the following bsRoles: ${roles.join(', ')}`
    );
  }

  return null;
}

/**
 * Return a warning message if `children` contains more than one child for any
 * of the exclusive `roles`, otherwise `null`.
 */
export function getDuplicateRoleError(component, children, ...roles) {
  let duplicate;

  roles.every(role => {
    const childrenWithRole = ValidComponentChildren.filter(
      children,
      child => child.props.bsRole === role
    );

    if (childrenWithRole.length > 1) {
      duplicate = role;
      return false;
    }

    return true;
  });

  if (duplicate) {
    return (
      `(children) ${component} - Duplicate children detected of bsRole: ` +
      `${duplicate}. Only one child each allowed with the following ` +
      `bsRoles: ${roles.join(', ')}`
    );
  }

  return null;
}
