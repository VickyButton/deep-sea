import type { DrawEngine } from './drawEngine.types';
import type { Canvas } from '../../domain/canvas/canvas.types';
import type { DrawStep } from '../../domain/drawStep/drawStep.types';
import type { DrawStepTranslator } from '../../domain/drawStep/translator/drawStepTranslator.types';

/** The main implementation of the DrawEngine interface. */
export class DrawEngine_Main implements DrawEngine {
  private readonly translator: DrawStepTranslator;

  constructor(translator: DrawStepTranslator) {
    this.translator = translator;
  }

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
