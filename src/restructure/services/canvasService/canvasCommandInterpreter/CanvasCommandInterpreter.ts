import type { Canvas } from './canvas/Canvas';
import type { CanvasCallback, CanvasCommand } from './canvasCommandInterpreter.types';

/** Executes canvas commands on the output canvas. */
export abstract class CanvasCommandInterpreter {
  private canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  /**
   * Executes a canvas command on the output canvas.
   * @param command The command to execute.
   */
  public execute(command: CanvasCommand) {
    this.executeCallback(this.toCallback(command));
  }

  private executeCallback(callback: CanvasCallback) {
    callback(this.canvas);
  }

  /**
   * Translates a canvas command into a canvas callback.
   * @param command The command to translate.
   * @throws An error if command cannot be translated.
   */
  protected abstract toCallback(command: CanvasCommand): CanvasCallback;
}

