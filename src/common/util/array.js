/**
 *
 * @param {array} arr
 * @param {number} from
 * @param {number} to
 * @returns {array} new array
 */
export function arrayMove(arr, from, to) {
  const target = arr[from];
  const filtered = arr.filter((_, index) => index !== from);

  return [...filtered.slice(0, to), target, ...filtered.slice(to)];
}
