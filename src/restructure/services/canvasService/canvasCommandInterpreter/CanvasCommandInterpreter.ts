import type { Canvas } from './canvasCommandTranslator/canvas/Canvas';
import type { CanvasCommandTranslator } from './canvasCommandTranslator/CanvasCommandTranslator';
import type { CanvasCallback, CanvasCommand } from './canvasCommandTranslator/canvasCommandTranslator.types';

/** Executes canvas commands on an output canvas. */
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
   * Executes a canvas command on the output canvas.
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

