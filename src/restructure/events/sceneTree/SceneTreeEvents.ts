import type { Node } from '../../nodes';
import { Event } from '../Event';

/** Events for the Scene Tree component. */
export class SceneTreeEvents {
  /** Event for setting the current scene. */
  public readonly SetCurrentScene = new Event<Node>();
  /** Event for starting the current scene. */
  public readonly StartCurrentScene = new Event<void>();
  /** Event for stopping the current scene. */
  public readonly StopCurrentScene = new Event<void>();
}
