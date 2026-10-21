import type { Canvas } from '../../canvas/canvas.types';
import type { DrawStep } from '../drawStep.types';

/** Used for translating draw steps canvas callbacks. */
export interface DrawStepTranslator {
  /**
   * Translates a draw step into a canvas callback.
   * @param step The step to translate.
   * @returns Callback for executing the step on a canvas.
   */
  translate(step: DrawStep): (canvas: Canvas) => void;
}
