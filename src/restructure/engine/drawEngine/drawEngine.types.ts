import type { DrawStep } from '../../domain/drawStep/drawStep.types';

/** An interface for executing draw steps on a target canvas. */
export interface DrawEngine {
  /**
   * Executes draw steps on the target canvas.
   * @param steps The ordered steps to execute on the target canvas.
   */
  draw(steps: DrawStep[]): void;
}
