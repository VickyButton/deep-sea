import type { Canvas } from './canvasCommandInterpreter/canvasCommandTranslator/canvas/Canvas';
import type { CanvasCommandTranslator } from './canvasCommandInterpreter/canvasCommandTranslator/CanvasCommandTranslator';
import type { CanvasCommand } from './canvasCommandInterpreter/canvasCommandTranslator/canvasCommandTranslator.types';
import { CanvasCommandInterpreter } from './canvasCommandInterpreter/CanvasCommandInterpreter';

/** A service for executing canvas commands. */
export class CanvasService {
  private readonly interpreter: CanvasCommandInterpreter;

  constructor(canvas: Canvas, translator: CanvasCommandTranslator) {
    this.interpreter = new CanvasCommandInterpreter(canvas, translator);
  }

  /**
   * Executes a canvas command. 
   * @param command The canvas command to execute.
   */
  public execute(command: CanvasCommand) {
    this.interpreter.execute(command);
  }
}
