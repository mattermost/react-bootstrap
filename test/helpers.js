export function shouldWarn(about) {
  console.error.expected.push(about); // eslint-disable-line no-console
}

export function getOne(collection) {
  expect(collection.length).to.equal(1);
  return collection[0];
}
