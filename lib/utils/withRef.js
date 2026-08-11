"use strict";

exports.__esModule = true;
exports.default = withRef;

/**
 * Given a function, returns that function with the first parameter set to the referenced element.
 */
function withRef(callback, ref) {
  return callback ? function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return callback.apply(void 0, [ref.current].concat(args));
  } : undefined;
}

module.exports = exports["default"];