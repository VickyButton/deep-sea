/** Represents a canvas interface for drawing. */
export interface Canvas {
  /** The height of the canvas in pixels. */
  height: number;
  /** The width of the canvas in pixels. */
  width: number;
  /** Begins a new path. */
  beginPath(): void;
  /** Clears the canvas. */
  clear(): void;
  /** Closes current path. */
  closePath(): void;
  /**
   * Draws an arc.
   * @param x The horizontal coordinate of the arc's center.
   * @param y The vertical coordinate of the arc's center.
   * @param radius The arc's radius in pixels.
   * @param startAngle The angle at which the arc starts in radians, measured from the positive x-axis.
   * @param endAngle The angle at which the arc ends in radians, measured from the positive x-axis.
   * @param counterClockwise If true, draws the arc counter-clockwise between the start and end angles.
   */
  drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean): void;
  /**
   * Draws a line between two points.
   * @param fromX The x-axis coordinate of the line's starting point.
   * @param fromY The y-axis coordinate of the line's starting point.
   * @param toX The x-axis coordinate of the line's stopping point.
   * @param toY The y-axis coordinate of the line's stopping point.
   */
  drawLine(fromX: number, fromY: number, toX: number, toY: number): void;
  /**
   * Draws a rectangle.
   * @param x The x-axis coordinate of the rectangle's starting point.
   * @param y The x-axis coordinate of the rectangle's starting point.
   * @param width The rectangle's width. Positive values are to the right, and negative to the left.
   * @param height The rectangle's height. Positive values are down, and negative are up.
   */
  drawRectangle(x: number, y: number, width: number, height: number): void;
  /** Fills the current path with the current fill color. */
  fill(): void;
  /** Resets the canvas transformation matrix to the identity canvas. */
  resetTransform(): void;
  /**
   * Sets the fill color.
   * @param color The color to use for filling.
   */
  setFillColor(color: string): void;
  /**
   * Sets the stroke color.
   * @param color The color to use for stroking.
   */
  setStrokeColor(color: string): void;
  /**
   * Applies a transformation matrix to the canvas.
   * @param a The cell in the first row and first column of the matrix.
   * @param b The cell in the second row and first column of the matrix.
   * @param c The cell in the first row and second column of the matrix.
   * @param d The cell in the second row and second column of the matrix.
   * @param e The cell in the first row and third column of the matrix.
   * @param f The cell in the second row and third column of the matrix.
   */
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  /** Strokes the current path with the current stroke color. */
  stroke(): void;
  /**
   * Transfers the canvas contents into an image bitmap.
   * @returns An image bitmap representation of the canvas contents.
   */
  toImageBitmap(): ImageBitmap;
}
