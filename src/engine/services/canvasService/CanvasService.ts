import type { CanvasCommand } from './canvasCommandTranslator/canvasCommand/CanvasCommand';
import type { Canvas } from '../../../core/os/Canvas';
import { CanvasCommandTranslator } from './CanvasCommandTranslator';

/** A service for executing canvas commands. */
export class CanvasService {
  private readonly canvas: Canvas;
  private readonly translator = new CanvasCommandTranslator();

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  /**
   * Executes a canvas command. 
   * @param command The canvas command to execute.
   */
  public execute(command: CanvasCommand) {
    this.translate(command)(this.canvas);
  }

  private translate(command: CanvasCommand) {
    return this.translator.translate(command);
  }
}
