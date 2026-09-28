import type { SceneTree, SceneTreeEvents } from './sceneTree.types';
import { EventController } from '../../controllers/EventController';

/** Maps Scene Tree events to their corresponding methods. */
export class SceneTreeEventController extends EventController {
  constructor(tree: SceneTree, events: SceneTreeEvents) {
    super();

    this.assignListeners(tree, events);
  }

  private assignListeners(tree: SceneTree, events: SceneTreeEvents) {
    this.on(events.SetCurrentScene, tree.setCurrentScene.bind(tree));
    this.on(events.StartCurrentScene, tree.startCurrentScene.bind(tree));
    this.on(events.StopCurrentScene, tree.stopCurrentScene.bind(tree));
  }
}
