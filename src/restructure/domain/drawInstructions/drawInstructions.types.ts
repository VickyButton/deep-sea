import type { DrawStep } from '../drawStep/drawStep.types';

/** A list of steps for drawing onto a canvas. */
export interface DrawInstructions {
  /** The list of steps that make up the instructions. */
  readonly steps: DrawStep[];
  /** The z-index at which the instructions should be executed. */
  readonly zIndex: number;
}
