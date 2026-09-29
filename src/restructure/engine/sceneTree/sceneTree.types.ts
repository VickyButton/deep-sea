import type { Node } from '../../nodes/Node';

/** The main node tree used for scenes. */
export interface SceneTree {
  /**
   * Sets the current scene in the scene tree,
   * @param scene The scene to set as the current scene.
   */
  setCurrentScene(scene: Node): void;
  /** Starts the current scene. */
  startCurrentScene(): void;
  /** Stops the current scene. */
  stopCurrentScene(): void;
}
