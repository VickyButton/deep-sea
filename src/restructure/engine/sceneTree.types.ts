import type { Node } from '../nodes/Node';

/**
 * A tree consisting of scenes.
 */
export interface SceneTree {
  /** The scene tree's root node. */
  root: Node;
  /**
   * Switches to a new scene.
   * @param scene The scene to switch to.
   */
  switchToScene(scene: Node): void;
  /** Sets up the scene tree. */
  setup(): void;
  /** Activates the scene tree. */
  activate(): void;
  /** Deactivates the scene tree. */
  deactivate(): void;
  /** Tears down the scene tree. */
  teardown(): void;
}
