/**
 * Combines a list of elements
 */
export const compose = (...list) =>
  list.reduce((next, current) => (...args) => next(current(...args)));
