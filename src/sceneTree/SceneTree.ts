import type { Engine } from '../engine/Engine';
import { Root } from './nodes/main/Root';

/** Controls scene node hierarchy and provides nodes with an interface for using engine services. */
export class SceneTree {
  /** The interface for interacting with core engine services. */
  public readonly engine: Engine;
  /** The root node. */
  public readonly root = SceneTree.createRoot();

  /**
   * Creates a new SceneTree.
   * @param engine The engine interface.
   */
  constructor(engine: Engine) {
    this.engine = engine;
    this.root.tree = this;
  }

  private static createRoot() {
    return new Root({
      id: 'ROOT',
    });
  }
}
