/**
 *  Return the first two letter
 *
 * @param {String} name
 * @return {String} initials
 */
export function getInitials(name) {
  if (name) return name.slice(0, 2).toUpperCase();
  return "..";
}
