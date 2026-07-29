import _parseInt from "@babel/runtime-corejs2/core-js/parse-int";
import React, { useCallback } from 'react';
var hasRefProp = _parseInt(React.version, 10) >= 19;
/**
 * Given any number of React ref callbacks or ref objects, returns a new ref callback
 * that sets all of the provided refs. This result isn't memoized, so useMergedRef
 * should be preferred.
 */

export function makeMergedRef(refs) {
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

export function useMergedRef(refs) {
  return useCallback(makeMergedRef(refs), refs);
}
/**
 * Given a React element, returns the ref of that object in a way that's compatible
 * with different React versions.
 */

export function getElementRef(reactElement) {
  if (!reactElement) {
    return null;
  } // Accessing reactElement.ref prints a warning in React 19 and will likely be removed eventually


  return hasRefProp ? reactElement.props.ref : reactElement.ref;
}