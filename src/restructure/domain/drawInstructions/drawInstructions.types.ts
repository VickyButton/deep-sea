import type { DrawStep } from '../drawStep/drawStep.types';

/** Instructions for drawing a graphic on a canvas. */
export interface DrawInstructions {
  /** The ordered list of steps for drawing the graphic. */
  readonly steps: DrawStep[];
  /** The canvas z-index at which the instructions should be executed. */
  readonly zIndex: number;
}
