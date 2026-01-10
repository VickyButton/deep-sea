import type { GraphicsConfiguration } from '@core/engine/Graphics';
import type { LoopConfiguration } from '@core/engine/Loop';
import { Audio } from '@core/engine/Audio';
import { Graphics } from '@core/engine/Graphics';
import { Loop } from '@core/engine/Loop';
import { SceneManager } from '@core/engine/SceneManager';
import { TaskManager } from '@core/engine/TaskManager';
import { error, log } from '@core/utils/logger';
import { AssetLoader, AssetLoaderConfiguration } from './engine/AssetLoader';
import { InputController } from './engine/InputController';
import { Physics2D } from './engine/Physics2D';

interface GameConfiguration {
  initialSceneName: string;
  assetLoader: AssetLoaderConfiguration;
  graphics: GraphicsConfiguration;
  loop: LoopConfiguration;
}

const LOG_TAG = 'Game';

export class Game {
  public readonly assetLoader: AssetLoader;
  public readonly audio: Audio;
  public readonly graphics: Graphics;
  public readonly inputController: InputController;
  public readonly loop: Loop;
  public readonly physics: Physics2D;
  public readonly sceneManager: SceneManager;
  public readonly taskManager: TaskManager;
  public debugMode = false;
  private readonly configuration: GameConfiguration;
  private initialSceneLoadTaskId?: string;

  constructor(configuration: GameConfiguration) {
    this.configuration = configuration;
    this.assetLoader = new AssetLoader(configuration.assetLoader);
    this.audio = new Audio();
    this.graphics = new Graphics(configuration.graphics);
    this.inputController = new InputController();
    this.loop = new Loop(configuration.loop);
    this.physics = new Physics2D();
    this.sceneManager = new SceneManager();
    this.taskManager = new TaskManager();
  }

  /**
   * Toggles debug mode.
   */
  public toggleDebugMode() {
    this.debugMode = !this.debugMode;
  }

  /**
   * Sets up the game components and loads initial scene.
   */
  public setup() {
    log(LOG_TAG, 'Initializing...');

    this.loop.setLoopCallback(this.onLoop.bind(this));
    this.graphics.syncWithTargetCanvas();
    this.inputController.attachListeners();

    const initialSceneLoadTask = this.sceneManager.loadScene(this.configuration.initialSceneName);

    // Loads and sets initial scene.
    this.initialSceneLoadTaskId = this.taskManager.registerTask(initialSceneLoadTask, (scene) => {
      this.sceneManager.setActiveScene(scene);
    });
  }

  public teardown() {
    this.inputController.detachListeners();
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
      this.physics.update();
      this.graphics.update();
      this.graphics.draw();
    } catch (err) {
      error(LOG_TAG, String(err));

      this.loop.stop();
    }
  }
}
