import { Viewport } from '../node/viewport/Viewport';

export class SceneTree {
  /** The scene viewport. */
  public readonly viewport = SceneTree.createViewport();

  private static createViewport() {
    return new Viewport({
      id: 'SCENE_VIEWPORT',
    });
  }
}
