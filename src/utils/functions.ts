/**
 * Truncates a given string to a specified maximum length and appends ellipsis if it exceeds the limit.
 *
 * @param {string} txt - The text string to be truncated.
 * @param {number} [maxLen=50] - The maximum allowed length of the text. Defaults to 50.
 * @returns {string} The original text if within the limit, or a truncated version followed by "...".
 */
export function textSlicer(txt: string, maxLen: number = 80) {
    if (txt.length >= maxLen) return `${txt.slice(0, maxLen)}..`;
    return txt
}

export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}