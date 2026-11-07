import { Root } from './nodes/main/Root';

/** Controls scene node hierarchy and provides nodes with an interface for using engine services. */
export class SceneTree {
  /** The root node. */
  public readonly root = SceneTree.createRoot();

  /**
   * Creates a new SceneTree.
   */
  constructor() {
    this.root.tree = this;
  }

  private static createRoot() {
    return new Root({
      id: 'ROOT',
    });
  }
}
