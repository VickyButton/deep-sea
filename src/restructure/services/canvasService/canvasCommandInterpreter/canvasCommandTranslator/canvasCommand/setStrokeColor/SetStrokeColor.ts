/** The canvas command for setting the stroke color. */
export class SetStrokeColor {
  public readonly type = 'SET_STROKE_COLOR';
  /** The color to set the stroke color to. */
  public readonly color: string;

  constructor(color: string) {
    this.color = color;
  }
}
