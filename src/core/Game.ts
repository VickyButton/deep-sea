import type { CameraConfiguration } from './Camera';
import type { GraphicsConfiguration } from './Graphics';
import type { LoopConfiguration } from './Loop';
import { Audio } from './Audio';
import { Camera } from './Camera';
import { Graphics } from './Graphics';
import { Loop } from './Loop';
import { SceneManager } from './SceneManager';
import { TaskManager } from './TaskManager';
import { error, log } from './utils/logger';

interface GameConfiguration {
  camera: CameraConfiguration;
  graphics: GraphicsConfiguration;
  loop: LoopConfiguration;
}

const LOG_TAG = 'Game';
const INTRO_SCENE_NAME = 'DeepSeaSplash';

export class Game {
  public readonly audio: Audio;
  public readonly camera: Camera;
  public readonly graphics: Graphics;
  public readonly loop: Loop;
  public readonly sceneManager: SceneManager;
  public readonly taskManager: TaskManager;
  private loadScenesTaskId?: string;

  constructor(configuration: GameConfiguration) {
    this.audio = new Audio();
    this.camera = new Camera(configuration.camera);
    this.graphics = new Graphics(configuration.graphics);
    this.loop = new Loop(configuration.loop);
    this.sceneManager = new SceneManager();
    this.taskManager = new TaskManager();
  }

  /**
   * Initializes game components and loads the intro scene and title scene.
   *
   * @param sceneName The title scene to switch to after the intro scene.
   */
  public initialize(sceneName: string) {
    log(LOG_TAG, 'Initializing...');

    this.graphics.initialize();
    this.loop.initialize(this.onLoop.bind(this));

    const loadScenesTask = Promise.all([
      this.sceneManager.loadScene(INTRO_SCENE_NAME),
      this.sceneManager.loadScene(sceneName),
    ]);

    // Loads and sets intro and title scenes.
    this.loadScenesTaskId = this.taskManager.registerTask(
      loadScenesTask,
      ([introScene, titleScene]) => {
        this.sceneManager.setActiveScene(introScene);

        setTimeout(() => {
          this.sceneManager.setActiveScene(titleScene);
        }, 5000);
      },
    );
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
    return this.loadScenesTaskId ? !this.taskManager.isTaskActive(this.loadScenesTaskId) : true;
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
