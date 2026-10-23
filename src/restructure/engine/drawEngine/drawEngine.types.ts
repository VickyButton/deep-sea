import type { Canvas } from '../../domain/canvas/canvas.types';
import type { DrawStep } from '../../domain/drawStep/drawStep.types';

/** An interface for executing draw steps on a target canvas. */
export interface DrawEngine {
  /**
   * Executes draw steps on the target canvas.
   * @param canvas The target canvas to execute the steps on.
   * @param steps The ordered steps to execute on the target canvas.
   */
  draw(canvas: Canvas, steps: DrawStep[]): void;
}
