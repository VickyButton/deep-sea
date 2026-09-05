import type { Node } from '../domain/node.types';

/**
 * A tree consisting of scenes.
 */
export interface SceneTree {
  /** The scene tree's root node. */
  root: Node;
  /**
   * Adds a scene to the scene tree. Adding a scene to the scene tree readies and activates it.
   * @param scene The scene to add to the scene tree.
   */
  addScene(scene: Node): void;
  /**
   * Removes a scene from the scene tree. Removing a scene from the scene tree unreadies and deactivates it.
   * @param scene The scene to remove from the scene tree.
   */
  removeScene(scene: Node): void;
}
