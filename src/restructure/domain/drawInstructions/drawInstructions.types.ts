import type { DrawStep } from '../drawStep/drawStep.types';

/** Instructions for drawing onto a canvas. */
export interface DrawInstructions {
  /** The ordered list of draw steps. */
  readonly steps: DrawStep[];
  /** The canvas z-index at which the instructions should be executed. */
  readonly zIndex: number;
}
