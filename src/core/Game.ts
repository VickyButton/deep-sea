import type { CameraConfiguration } from './components/Camera';
import type { GraphicsConfiguration } from './components/Graphics';
import type { LoopConfiguration } from './components/Loop';
import { Audio } from './components/Audio';
import { Camera } from './components/Camera';
import { Graphics } from './components/Graphics';
import { Loop } from './components/Loop';
import { SceneManager } from './components/SceneManager';
import { TaskManager } from './components/TaskManager';
import { error, log } from './utils/logger';

interface GameConfiguration {
  camera: CameraConfiguration;
  graphics: GraphicsConfiguration;
  loop: LoopConfiguration;
}

const LOG_TAG = 'Game';

export class Game {
  public readonly audio: Audio;
  public readonly camera: Camera;
  public readonly graphics: Graphics;
  public readonly loop: Loop;
  public readonly sceneManager: SceneManager;
  public readonly taskManager: TaskManager;
  private initialSceneLoadTaskId?: string;

  constructor(configuration: GameConfiguration) {
    this.audio = new Audio();
    this.camera = new Camera(configuration.camera);
    this.graphics = new Graphics(configuration.graphics);
    this.loop = new Loop(configuration.loop);
    this.sceneManager = new SceneManager();
    this.taskManager = new TaskManager();
  }

  /**
   * Sets up the game components and loads the initial scene.
   *
   * @param sceneName The name of the initial scene to load.
   */
  public setup(sceneName: string) {
    log(LOG_TAG, 'Initializing...');

    this.graphics.setup();
    this.loop.setup(this.onLoop.bind(this));

    const initialSceneLoadTask = this.sceneManager.loadScene(sceneName);

    // Loads and sets initial scene.
    this.initialSceneLoadTaskId = this.taskManager.registerTask(initialSceneLoadTask, (scene) => {
      this.sceneManager.setActiveScene(scene);
    });
  }

  /**
   * Starts the game loop.
   */
  public start() {
    log(LOG_TAG, 'Starting...');

    this.loop.start();
  }

  /**
   * Stops the game loop.
   */
  public stop() {
    log(LOG_TAG, 'Stopping...');

    this.loop.stop();
  }

  private get isReady() {
    return this.initialSceneLoadTaskId
      ? !this.taskManager.isTaskActive(this.initialSceneLoadTaskId)
      : true;
  }

  private onLoop(dt: number) {
    if (!this.isReady) return;

    try {
      this.sceneManager.updateActiveScene(dt);
      this.camera.update();
      this.graphics.draw();
    } catch (err) {
      error(LOG_TAG, `Error: ${String(err)}`);

      this.loop.stop();
    }
  }
}
