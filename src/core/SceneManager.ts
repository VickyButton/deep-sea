import { Scene } from './entities/Scene';
import { log } from './utils/logger';

export interface SceneManagerConfiguration {
  defaultSceneName: string;
}

const SCENE_MANAGER_LOG_TAG = 'SceneManager';

export class SceneManager {
  private readonly configuration: SceneManagerConfiguration;
  private activeScene?: Scene;

  constructor(configuration: SceneManagerConfiguration) {
    this.configuration = configuration;
  }

  public initialize() {
    log(SCENE_MANAGER_LOG_TAG, 'Initializing...');

    this.loadScene(this.configuration.defaultSceneName)
      .then((scene) => {
        this.setActiveScene(scene);
      })
      .catch((err: unknown) => {
        log('Error', err instanceof Error ? err.message : 'Could not load default scene');
      });
  }

  public setActiveScene(scene: Scene) {
    log(SCENE_MANAGER_LOG_TAG, `Setting ${scene.state.name} as active scene...`);

    this.activeScene = scene;
  }

  public startActiveScene() {
    if (this.activeScene) this.activeScene.start();
  }

  public stopActiveScene() {
    if (this.activeScene) this.activeScene.stop();
  }

  public updateActiveScene(dt: number) {
    if (this.activeScene) this.activeScene.update(dt);
  }

  public async loadScene(sceneName: string) {
    const filePath = `/src/scenes/${sceneName}/${sceneName}`; // TODO: Use dist instead of src when not in dev env.
    const moduleImport = import(filePath) as Promise<unknown>;
    const importedModule = await moduleImport;

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
