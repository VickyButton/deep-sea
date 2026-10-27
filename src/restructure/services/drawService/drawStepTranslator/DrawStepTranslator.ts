import type { CanvasCommand } from '../../../domain/canvas/canvas.types';
import type { DrawStep } from '../../../domain/drawStep/drawStep.types';

/** Translates draw steps into canvas commands. */
export abstract class DrawStepTranslator {
  /**
   * Translates a draw step into a canvas command.
   * @param step The draw step to translate.
   * @returns The corresponding canvas command.
   * @throws An error if no corresponding canvas command.
   */
  public abstract translate(step: DrawStep): CanvasCommand;
}
