import type { CanvasService } from './services/canvasService/CanvasService';
import type { LoopService } from './services/loopService/LoopService';

/** An interface for interacting with core engine services. */
export class Engine {
  /** The engine canvas interface. */
  public readonly canvas: CanvasService;
  /** The engine loop interface. */
  public readonly loop: LoopService;

  /**
   * Creates a new Engine.
   * @param canvas The engine canvas service.
   * @param loop The engine loop service.
   */
  constructor(canvas: CanvasService, loop: LoopService) {
    this.canvas = canvas;
    this.loop = loop;
  }
}
