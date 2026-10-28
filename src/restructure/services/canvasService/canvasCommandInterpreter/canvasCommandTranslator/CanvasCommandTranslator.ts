import type { CanvasCallback } from './canvasCommandTranslator.types';
import type { CanvasCommand } from '../../../../domain/canvasCommand/CanvasCommand';

/** Translates canvas commands into canvas callbacks. */
export abstract class CanvasCommandTranslator {
  /**
   * Translates a canvas command into a canvas callback.
   * @param command The canvas command to translate.
   * @returns The translated canvas callback.
   * @throws An error if the command cannot be translated.
   */
  public abstract translate(command: CanvasCommand): CanvasCallback;
}
