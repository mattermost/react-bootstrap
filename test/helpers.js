export function shouldWarn(about) {
  console.error.expected.push(about); // eslint-disable-line no-console
}

/**
 * Asserts that exactly one element in `root` matches `selector` and returns it.
 */
export function assertSingle(root, selector) {
  const found = root.querySelectorAll(selector);
  expect(found).to.have.length(1);
  return found[0];
}

/**
 * Asserts that no element in `root` matches `selector`.
 */
export function assertNone(root, selector) {
  expect(root.querySelectorAll(selector)).to.have.length(0);
}

export function getOne(collection) {
  expect(collection.length).to.equal(1);
  return collection[0];
}
