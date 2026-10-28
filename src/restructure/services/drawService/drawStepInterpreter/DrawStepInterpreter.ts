import type { DrawStepTranslator } from './drawStepTranslator/DrawStepTranslator';
import type { Canvas } from '../../../domain/canvas/canvas.types';
import type { DrawStep } from '../../../domain/drawStep/drawStep.types';

/** Draws to the output canvas by executing a list of draw steps. */
export class DrawStepInterpreter {
  private canvas: Canvas;
  private translator: DrawStepTranslator;

  constructor(canvas: Canvas, translator: DrawStepTranslator) {
    this.canvas = canvas;
    this.translator = translator;
  }

  /**
   * Executing a list of draw steps using the output canvas.
   * @param steps The list of draw steps to execute.
   */
  public execute(steps: DrawStep[]) {
    steps.forEach((step) => this.executeStep(step));
  }

  private executeStep(step: DrawStep) {
    this.toCanvasCommand(step)(this.canvas);
  }

  private toCanvasCommand(step: DrawStep) {
    return this.translator.translate(step);
  }
}
