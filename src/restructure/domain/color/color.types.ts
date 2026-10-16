/** A color that can be converted into a string for use in a canvas. */
export interface Color {
  /**
   * Converts the color into a canvas-ready color string.
   * @returns The color in string format.
   */
  toString(): string;
}
