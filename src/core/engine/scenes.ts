import { Scene } from '@core/nodes/Scene';
import { log } from '@core/utils/logger';
import { useAssets } from 'assets';
import { useNodes } from 'nodes';

const LOG_TAG = 'scenes';

class SceneManager {
  private activeScene?: Scene;

  /**
   * Sets a new active scene for use.
   *
   * @param scene The scene to switch to.
   */
  public setActiveScene(scene: Scene) {
    log(LOG_TAG, `Setting "${scene.title}" as active scene...`);

    this.teardownActiveScene();

    scene.setup();

    this.activeScene = scene;
  }

  /**
   * Updates the active scene.
   *
   * @param dt The time, in milliseconds, since the last update call.
   */
  public updateActiveScene(dt: number) {
    if (this.activeScene) this.activeScene.update(dt);
  }

  /**
   * Tears down the active scene.
   */
  public teardownActiveScene() {
    if (this.activeScene) this.activeScene.teardown();
  }

  /**
   * Loads a scene from the scenes directory.
   *
   * @param sceneName The name of the scene to load.
   * @returns The loaded scene.
   */
  public async loadScene(name: string) {
    const assets = useAssets();
    const nodes = useNodes();
    const config = assets.sceneConfigs.get(name) ?? (await assets.sceneConfigs.load(name));
    const scene = await nodes.parseNode(config);

    return scene;
  }
}

let scenes = new SceneManager();

export function useScenes() {
  return scenes;
}

export function resetScenes() {
  scenes = new SceneManager();
}
