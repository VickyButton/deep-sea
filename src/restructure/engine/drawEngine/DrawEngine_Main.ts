import type { DrawEngine } from './drawEngine.types';
import type { Canvas } from '../../domain/canvas/canvas.types';
import type { DrawStep } from '../../domain/drawStep/drawStep.types';
import type { DrawStepTranslator } from '../../domain/drawStep/translator/drawStepTranslator.types';

/** The main implementation of the DrawEngine interface. */
export class DrawEngine_Main implements DrawEngine {
  private readonly canvas: Canvas;
  private readonly translator: DrawStepTranslator;

  constructor(canvas: Canvas, translator: DrawStepTranslator) {
    this.canvas = canvas;
    this.translator = translator;
  }

  public draw(steps: DrawStep[]) {
    for (const step of steps) {
      this.executeStep(step);
    }
  }

  private executeStep(step: DrawStep) {
    this.getStepCallback(step)(this.canvas);
  }

  private getStepCallback(step: DrawStep) {
    return this.translator.translate(step);
  }
}
