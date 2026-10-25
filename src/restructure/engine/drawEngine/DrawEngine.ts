import type { Canvas } from '../../domain/canvas/canvas.types';
import type { DrawStep } from '../../domain/drawStep/drawStep.types';
import type { DrawStepTranslator } from '../../domain/drawStep/translator/drawStepTranslator.types';

/** An interface for executing draw steps on a target canvas. */
export class DrawEngine {
  private readonly translator: DrawStepTranslator;

  constructor(translator: DrawStepTranslator) {
    this.translator = translator;
  }

  /**
   * Executes draw steps on the target canvas.
   * @param canvas The target canvas to execute the steps on.
   * @param steps The ordered steps to execute on the target canvas.
   */
  public draw(canvas: Canvas, steps: DrawStep[]) {
    for (const step of steps) {
      this.executeStepOnCanvas(step, canvas);
    }
  }

  private executeStepOnCanvas(step: DrawStep, canvas: Canvas) {
    this.getStepCallback(step)(canvas);
  }

  private getStepCallback(step: DrawStep) {
    return this.translator.translate(step);
  }
}
