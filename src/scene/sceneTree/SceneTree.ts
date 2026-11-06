import { Viewport } from '../node/viewport/Viewport';

export class SceneTree {
  /** The scene root. */
  public readonly root = SceneTree.createViewport();

  private static createViewport() {
    return new Viewport({
      id: 'SCENE_VIEWPORT',
    });
  }
}
