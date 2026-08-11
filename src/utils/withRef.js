/**
 * Given a function, returns that function with the first parameter set to the referenced element.
 */
export default function withRef(callback, ref) {
  return callback ? (...args) => callback(ref.current, ...args) : undefined;
}
