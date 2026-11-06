/**
 * Ensures a number is within a defined range by rounding it up or down if it exceeds the range.
 * @param value The value to clamp.
 * @param min The minimum value to round up to.
 * @param max The maximum value to round down to.
 * @returns The original number, or an extrema if the original number exceeds the range.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
