/** The canvas command for drawing a line. */
export class DrawLine {
  public readonly type = 'DRAW_LINE';
  /** The x-axis coordinate of the line's starting point. */
  public readonly fromX: number;
  /** The y-axis coordinate of the line's starting point. */
  public readonly fromY: number;
  /** The x-axis coordinate of the line's stopping point. */
  public readonly toX: number;
  /** The y-axis coordinate of the line's stopping point. */
  public readonly toY: number;

  constructor(fromX: number, fromY: number, toX: number, toY: number) {
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX;
    this.toY = toY;
  }
}
