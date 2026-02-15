import { Scene } from '@core/nodes/Scene';
import { log } from '@core/utils/logger';
import { useConfig } from 'config';

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
  public async loadScene(sceneName: string) {
    const config = useConfig();
    const url = `${config.content.scenes}/${sceneName}/${sceneName}`;

    log(LOG_TAG, `Loading "${url}"...`);

    const response: unknown = await import(/* @vite-ignore */ url);

    if (!response) {
      throw new Error(`Unable to load "${url}"`);
    } else if (!this.isScene(response)) {
      throw new Error(`No default scene export provided in "${url}"`);
    }

    return response.default;
  }

  private isScene(value: unknown): value is { default: Scene } {
    return (
      value !== null &&
      typeof value === 'object' &&
      'default' in value &&
      value.default instanceof Scene
    );
  }
}

let scenes = new SceneManager();

export function useScenes() {
  return scenes;
}

export function resetScenes() {
  scenes = new SceneManager();
}
