/**
 * Parses a comma-separated query parameter string into a number array.
 * Trims spaces and filters out invalid numbers.
 * @param param The query param string, e.g. "1, 2,3"
 * @returns Array of valid numbers
 */
export function parseCommaSeparatedNumbers(param: string | undefined): number[] {
  if (!param) {
    return [];
  }

  return param
    .split(',')
    .map(id => parseInt(id.trim(), 10))
    .filter(id => !isNaN(id));
};
