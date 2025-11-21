import { Scene } from './entities/Scene';
import { error, log } from './utils/logger';

export interface SceneManagerConfiguration {
  defaultSceneName: string;
}

const LOG_TAG = 'SceneManager';

export class SceneManager {
  private readonly configuration: SceneManagerConfiguration;
  private activeScene?: Scene;

  constructor(configuration: SceneManagerConfiguration) {
    this.configuration = configuration;
  }

  /**
   * Loads and sets the default scene, as defined in the configuration.
   */
  public initialize() {
    log(LOG_TAG, 'Initializing...');

    this.loadScene(this.configuration.defaultSceneName)
      .then((scene) => {
        this.setActiveScene(scene);
      })
      .catch((err: unknown) => {
        error(LOG_TAG, err instanceof Error ? err.message : 'Could not load default scene');
      });
  }

  /**
   * Sets a new active scene for use.
   *
   * @param scene The scene to switch to.
   */
  public setActiveScene(scene: Scene) {
    log(LOG_TAG, `Setting ${scene.state.name} as active scene...`);

    scene.initialize();

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
   * Loads a scene from the src/scenes directory.
   *
   * @param sceneName The name of the scene to load.
   * @returns The loaded scene.
   */
  public async loadScene(sceneName: string) {
    const filePath = `/src/scenes/${sceneName}/${sceneName}`; // TODO: Use dist instead of src when not in dev env.
    const importedModule: unknown = await import(filePath);

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
