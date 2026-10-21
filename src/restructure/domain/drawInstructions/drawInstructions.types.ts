/** Used for building draw instructions. */
export interface DrawInstructionsBuilder {
  /**
   * Appends a new step to the instructions.
   * @param step The step to append to the instructions.
   * @throws An error if a build hasn't already been started.
   */
  addStep(step: DrawStep): void;
  /**
   * Finishes the current build, returning the finished instructions.
   * @returns The finished instructions object.
   * @throws An error if a build hasn't already been started.
   */
  finishBuild(): DrawInstructions;
  /**
   * Sets the z-index for the instructions.
   * @param zIndex The z-index for the instructions to execute at.
   * @throws An error if a build hasn't already been started.
   */
  setZIndex(zIndex: number): void;
  /** Starts a new build. */
  startBuild(): void;
}

/** A list of steps for drawing onto a canvas. */
export interface DrawInstructions {
  /** The list of steps that make up the instructions. */
  readonly steps: DrawStep[];
  /** The z-index at which the instructions should be executed. */
  readonly zIndex: number;
}

export type DrawStep = DrawStep_BeginPath | DrawStep_ClosePath | DrawStep_DrawArc | DrawStep_DrawLine | DrawStep_DrawRectangle | DrawStep_Fill | DrawStep_ResetTransform | DrawStep_SetFillColor | DrawStep_SetStrokeColor | DrawStep_SetTransform | DrawStep_Stroke;

export interface DrawStep_BeginPath {
  type: 'BEGIN_PATH';
}

export interface DrawStep_ClosePath {
  type: 'CLOSE_PATH';
}

export interface DrawStep_DrawArc {
  type: 'DRAW_ARC';
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  counterClockwise?: boolean;
}

export interface DrawStep_DrawLine {
  type: 'DRAW_LINE';
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export interface DrawStep_DrawRectangle {
  type: 'DRAW_RECTANGLE';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DrawStep_Fill {
  type: 'FILL';
}

export interface DrawStep_ResetTransform {
  type: 'RESET_TRANSFORM';
}

export interface DrawStep_SetFillColor {
  type: 'SET_FILL_COLOR';
  color: string;
}

export interface DrawStep_SetStrokeColor {
  type: 'SET_STROKE_COLOR';
  color: string;
}

export interface DrawStep_SetTransform {
  type: 'SET_TRANSFORM';
  matrix: [number, number, number, number, number, number];
}

export interface DrawStep_Stroke {
  type: 'STROKE';
}
