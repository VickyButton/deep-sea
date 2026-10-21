import type { DrawStep } from '../drawStep/drawStep.types';

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
