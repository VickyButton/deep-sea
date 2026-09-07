import type { Node } from '../domain/node.types';

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
  /** Readies the scene tree. */
  ready(): void;
  /** Unreadies the scene tree. */
  unready(): void;
  /** Activates the scene tree. */
  activate(): void;
  /** Deactivates the scene tree. */
  deactivate(): void;
}
