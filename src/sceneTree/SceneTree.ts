import type { Engine } from '../engine/Engine';
import { Viewport } from './nodes/main/Viewport';

/** Controls scene node hierarchy and provides nodes with an interface for using engine services. */
export class SceneTree {
  /** The interface for interacting with core engine services. */
  public readonly engine: Engine;
  /** The scene root. */
  public readonly root = SceneTree.createViewport();

  /**
   * Creates a new SceneTree.
   * @param engine The engine interface.
   */
  constructor(engine: Engine) {
    this.engine = engine;
  }

  private static createViewport() {
    return new Viewport({
      id: 'SCENE_VIEWPORT',
    });
  }
}
