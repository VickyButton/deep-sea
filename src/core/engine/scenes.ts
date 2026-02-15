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
    log(LOG_TAG, `Setting ${scene.title} as active scene...`);

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
    const filePath = `${config.content.scenes}/${sceneName}/${sceneName}`;
    const importedModule: unknown = await import(/* @vite-ignore */ filePath);

    if (!importedModule) {
      throw new Error(`Could not load ${filePath}`);
    } else if (!this.isSceneConstructor(importedModule)) {
      throw new Error(`No Scene constructor exists in ${filePath}`);
    }

    const scene = new importedModule.default();

    return scene;
  }

  private isSceneConstructor(
    importedModule: unknown,
  ): importedModule is { default: new () => Scene } {
    return (
      importedModule !== null &&
      typeof importedModule === 'object' &&
      Object.keys(importedModule).includes('default')
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
