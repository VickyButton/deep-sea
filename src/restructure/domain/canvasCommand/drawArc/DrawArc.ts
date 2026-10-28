/** The canvas command for drawing an arc. */
export class DrawArc {
  public readonly type = 'DRAW_ARC';
  /** The x-axis coordinate of the arc's center. */
  public readonly x: number;
  /** The y-axis coordinate of the arc's center. */
  public readonly y: number;
  /** The arc's radius in pixels. */
  public readonly radius: number;
  /** The angle at which the arc starts in radians, measured from the positive x-axis. */
  public readonly startAngle: number;
  /** The angle at which the arc ends in radians, measured from the positive x-axis. */
  public readonly endAngle: number;
  /** If true, draws the arc counter-clockwise between the start and end angles. */
  public readonly counterClockwise: boolean;

  constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise: boolean) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.counterClockwise = counterClockwise;
  }
}
