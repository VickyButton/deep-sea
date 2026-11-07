import { Camera2D } from './nodes/2D/Camera2D';
import { Viewport } from './nodes/main/Viewport';

/** Controls scene node hierarchy and provides nodes with an interface for using engine services. */
export class SceneTree {
  /** The root node. */
  public readonly viewport = SceneTree.createViewport();

  /** Creates a new SceneTree instance. */
  constructor() {
    this.viewport.enterTree(this);
    this.viewport.setCamera(this.createCamera());
  }

  private createCamera() {
    return new Camera2D({
      id: 'CAMERA',
    });
  }

  private static createViewport() {
    return new Viewport({
      id: 'VIEWPORT',
    });
  }
}
