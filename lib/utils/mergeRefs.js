"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports.makeMergedRef = makeMergedRef;
exports.useMergedRef = useMergedRef;
exports.getElementRef = getElementRef;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

var _react = _interopRequireWildcard(require("react"));

var hasRefProp = (0, _parseInt2.default)(_react.default.version, 10) >= 19;
/**
 * Given any number of React ref callbacks or ref objects, returns a new ref callback
 * that sets all of the provided refs. This result isn't memoized, so useMergedRef
 * should be preferred.
 */

function makeMergedRef(refs) {
  return function (el) {
    refs.forEach(function (ref) {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref != null) {
        ref.current = el;
      }
    });
  };
}
/**
 * Given any number of React ref callbacks or ref objects, returns a new ref callback
 * that sets all of the provided refs.
 */


function useMergedRef(refs) {
  return (0, _react.useCallback)(makeMergedRef(refs), refs);
}
/**
 * Given a React element, returns the ref of that object in a way that's compatible
 * with different React versions.
 */


function getElementRef(reactElement) {
  if (!reactElement) {
    return null;
  } // Accessing reactElement.ref prints a warning in React 19 and will likely be removed eventually


  return hasRefProp ? reactElement.props.ref : reactElement.ref;
}