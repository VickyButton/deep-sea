import type { Canvas } from '../../../../core/os/Canvas';
import type { CanvasCommand } from './canvasCommandTranslator/canvasCommand/CanvasCommand';
import type { CanvasCommandTranslator } from './canvasCommandTranslator/CanvasCommandTranslator';
import type { CanvasCallback } from './canvasCommandTranslator/canvasCommandTranslator.types';

/** Executes canvas commands on a canvas. */
export class CanvasCommandInterpreter {
  private readonly canvas: Canvas;
  private readonly translator: CanvasCommandTranslator;

  /**
   * @param canvas The canvas to execute canvas commands on.
   * @param translator The translator to use for translating canvas commands into canvas callbacks.
   */
  constructor(canvas: Canvas, translator: CanvasCommandTranslator) {
    this.canvas = canvas;
    this.translator = translator;
  }

  /**
   * Executes a canvas command on the canvas.
   * @param command The command to execute.
   */
  public execute(command: CanvasCommand) {
    this.executeCallback(this.translate(command));
  }

  private executeCallback(callback: CanvasCallback) {
    callback(this.canvas);
  }

  private translate(command: CanvasCommand) {
    return this.translator.translate(command);
  }
}

