import PropTypes from 'prop-types';
import ValidComponentChildren from './ValidComponentChildren';
var idPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
export function generatedId(name) {
  return function (props) {
    var error = null;

    if (!props.generateChildId) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      error = idPropType.apply(void 0, [props].concat(args));

      if (!error && !props.id) {
        error = new Error("In order to properly initialize the " + name + " in a way that is accessible to assistive technologies " + ("(such as screen readers) an `id` or a `generateChildId` prop to " + name + " is required"));
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

export function getMissingRoleError(component, children) {
  var missing;

  for (var _len2 = arguments.length, roles = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    roles[_key2 - 2] = arguments[_key2];
  }

  roles.every(function (role) {
    if (!ValidComponentChildren.some(children, function (child) {
      return child.props.bsRole === role;
    })) {
      missing = role;
      return false;
    }

    return true;
  });

  if (missing) {
    return "(children) " + component + " - Missing a required child with bsRole: " + (missing + ". " + component + " must have at least one child of each of ") + ("the following bsRoles: " + roles.join(', '));
  }

  return null;
}
/**
 * Return a warning message if `children` contains more than one child for any
 * of the exclusive `roles`, otherwise `null`.
 */

export function getDuplicateRoleError(component, children) {
  var duplicate;

  for (var _len3 = arguments.length, roles = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    roles[_key3 - 2] = arguments[_key3];
  }

  roles.every(function (role) {
    var childrenWithRole = ValidComponentChildren.filter(children, function (child) {
      return child.props.bsRole === role;
    });

    if (childrenWithRole.length > 1) {
      duplicate = role;
      return false;
    }

    return true;
  });

  if (duplicate) {
    return "(children) " + component + " - Duplicate children detected of bsRole: " + (duplicate + ". Only one child each allowed with the following ") + ("bsRoles: " + roles.join(', '));
  }

  return null;
}