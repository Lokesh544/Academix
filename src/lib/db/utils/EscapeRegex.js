/**
 *
 * @param {String} text
 * @returns A Regex formated string
 */
export default function EscapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
