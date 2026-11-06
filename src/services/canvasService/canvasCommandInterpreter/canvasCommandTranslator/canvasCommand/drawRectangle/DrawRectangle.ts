/** The canvas command for drawing a rectangle. */
export class DrawRectangle {
  public readonly type = 'DRAW_RECTANGLE';
  /** The x-axis coordinate of the rectangle's starting point. */
  public readonly x: number;
  /** The x-axis coordinate of the rectangle's starting point. */
  public readonly y: number;
  /** The rectangle's width. Positive values are to the right, and negative to the left. */
  public readonly width: number;
  /** The rectangle's height. Positive values are down, and negative are up. */
  public readonly height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
