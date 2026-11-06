/** The canvas command for setting the fill color. */
export class SetFillColor {
  public readonly type = 'SET_FILL_COLOR';
  /** The color to set the fill color to. */
  public readonly color: string;

  constructor(color: string) {
    this.color = color;
  }
}
