import type { Node } from '../nodes';

/** Coordinates interactions between engine components. */
export interface Engine {
  /** Starts the engine. */
  start(): void;
  /** Stops the engine. */
  stop(): void;
  /**
   * Switches to a scene and starts that scene.
   * @param scene The scene to switch to.
   */
  switchToScene(scene: Node): void;
}
