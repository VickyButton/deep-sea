import type { Event } from '../../events';
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

/** Scene Tree events. */
export interface SceneTreeEvents {
  /** Event for setting the current scene. */
  SetCurrentScene: Event<Node>;
  /** Event for starting the current scene. */
  StartCurrentScene: Event<void>;
  /** Event for stopping the current scene. */
  StopCurrentScene: Event<void>;
}
