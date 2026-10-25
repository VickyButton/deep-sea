import type { DrawStep } from '../../drawStep/drawStep.types';

/** Used for building draw instructions. */
export class DrawInstructionsBuilder {
  private readonly steps: DrawStep[] = [];
  private zIndex = 0;

  /** Adds a draw step to the instructions steps. */
  public addStep(step: DrawStep) {
    this.steps.push(step);
  }

  /** Adds a "BEGIN_PATH" draw step to the instructions steps. */
  public beginPath() {
    this.addStep({
      type: 'BEGIN_PATH',
    });
  }

  /**
   * Builds the draw instructions.
   * @returns The finished draw instructions.
   */
  public build() {
    return {
      steps: this.steps,
      zIndex: this.zIndex,
    };
  }

  /** Adds a "CLOSE_PATH" draw step to the instructions steps. */
  public closePath() {
    this.addStep({
      type: 'CLOSE_PATH',
    });
  }

  /**
   * Adds a "DRAW_ARC" draw step to the instructions steps.
   * @param x The horizontal coordinate of the arc's center.
   * @param y The vertical coordinate of the arc's center.
   * @param radius The arc's radius in pixels.
   * @param startAngle The angle at which the arc starts in radians, measured from the positive x-axis.
   * @param endAngle The angle at which the arc ends in radians, measured from the positive x-axis.
   * @param counterClockwise If true, draws the arc counter-clockwise between the start and end angles.
   */
  public drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean) {
    this.addStep({
      type: 'DRAW_ARC',
      x,
      y,
      radius,
      startAngle,
      endAngle,
      counterClockwise,
    });
  }

  /**
   * Adds a "DRAW_LINE" draw step to the instructions steps.
   * @param fromX The x-axis coordinate of the line's starting point.
   * @param fromY The y-axis coordinate of the line's starting point.
   * @param toX The x-axis coordinate of the line's stopping point.
   * @param toY The y-axis coordinate of the line's stopping point.
   */
  public drawLine(fromX: number, fromY: number, toX: number, toY: number) {
    this.addStep({
      type: 'DRAW_LINE',
      fromX,
      fromY,
      toX,
      toY,
    });
  }

  /**
   * Adds a "DRAW_RECTANGLE" draw step to the instructions steps.
   * @param x The x-axis coordinate of the rectangle's starting point.
   * @param y The x-axis coordinate of the rectangle's starting point.
   * @param width The rectangle's width. Positive values are to the right, and negative to the left.
   * @param height The rectangle's height. Positive values are down, and negative are up.
   */
  public drawRectangle(x: number, y: number, width: number, height: number) {
    this.addStep({
      type: 'DRAW_RECTANGLE',
      x,
      y,
      width,
      height,
    });
  }

  /** Adds a "FILL" draw step to the instructions steps. */
  public fill() {
    this.addStep({
      type: 'FILL',
    });
  }

  /** Adds a "RESET_TRANSFORM" draw step to the instructions steps. */
  public resetTransform() {
    this.addStep({
      type: 'RESET_TRANSFORM',
    });
  }

  /**
   * Adds a "SET_FILL_COLOR" draw step to the instructions steps.
   * @param color The color to use for filling.
   */
  public setFillColor(color: string) {
    this.addStep({
      type: 'SET_FILL_COLOR',
      color,
    });
  }

  /**
   * Adds a "SET_STROKE_COLOR" draw step to the instructions steps.
   * @param color The color to use for stroking.
   */
  public setStrokeColor(color: string) {
    this.addStep({
      type: 'SET_STROKE_COLOR',
      color,
    });
  }

  /**
   * Adds a "SET_TRANSFORM" draw step to the instructions steps.
   * @param a The cell in the first row and first column of the matrix.
   * @param b The cell in the second row and first column of the matrix.
   * @param c The cell in the first row and second column of the matrix.
   * @param d The cell in the second row and second column of the matrix.
   * @param e The cell in the first row and third column of the matrix.
   * @param f The cell in the second row and third column of the matrix.
   */
  public setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.addStep({
      type: 'SET_TRANSFORM',
      a,
      b,
      c,
      d,
      e,
      f,
    });
  }

  /**
   * Sets the z-index for the instructions.
   * @param zIndex The z-index for the instructions to execute at.
   * @throws An error if a build hasn't already been started.
   */
  public setZIndex(zIndex: number) {
    this.zIndex = zIndex;
  }

  /** Adds a "STROKE" draw step to the instructions steps. */
  public stroke() {
    this.addStep({
      type: 'STROKE',
    });
  }
}
