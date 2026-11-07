import { Viewport } from './nodes/main/Viewport';

/** Controls scene node hierarchy and provides nodes with an interface for using engine services. */
export class SceneTree {
  /** The root node. */
  public readonly viewport = SceneTree.createViewport();

  /** Creates a new SceneTree. */
  constructor() {
    this.viewport.tree = this;
  }

  private static createViewport() {
    return new Viewport({
      id: 'ROOT',
    });
  }
}
