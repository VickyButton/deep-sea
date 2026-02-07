import { Audio } from '@core/engine/Audio';
import { Graphics } from '@core/engine/Graphics';
import { Loop } from '@core/engine/Loop';
import { SceneManager } from '@core/engine/SceneManager';
import { TaskManager } from '@core/engine/TaskManager';
import { error, log } from '@core/utils/logger';
import { getConfig } from 'config';
import { AssetLoader } from './engine/AssetLoader';
import { InputController } from './engine/InputController';
import { Physics2D } from './engine/Physics2D';
import { SpriteSheetManager } from './engine/SpriteSheetManager';
import { Vector2D } from './structures/Vector2D';

const LOG_TAG = 'Game';

export class Game {
  public readonly assetLoader: AssetLoader;
  public readonly audio: Audio;
  public readonly graphics: Graphics;
  public readonly inputController: InputController;
  public readonly loop: Loop;
  public readonly physics: Physics2D;
  public readonly sceneManager: SceneManager;
  public readonly spriteSheetManager: SpriteSheetManager;
  public readonly taskManager: TaskManager;
  public debugMode = false;
  private initialSceneLoadTaskId?: string;

  constructor() {
    const config = getConfig();

    this.assetLoader = new AssetLoader({
      imagesPath: config.assets.images,
    });
    this.audio = new Audio();
    this.graphics = new Graphics({
      size: new Vector2D(config.graphics.width, config.graphics.height),
    });
    this.inputController = new InputController();
    this.loop = new Loop({
      framesPerSecond: config.game.framesPerSecond,
    });
    this.physics = new Physics2D();
    this.sceneManager = new SceneManager();
    this.spriteSheetManager = new SpriteSheetManager();
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
    const config = getConfig();

    this.loop.setLoopCallback(this.onLoop.bind(this));
    this.audio.initialize();
    this.graphics.syncWithTargetCanvas();
    this.inputController.attachListeners();

    const initialSceneLoadTask = this.sceneManager.loadScene(config.game.splashScene);

    // Loads and sets initial scene.
    this.initialSceneLoadTaskId = this.taskManager.registerTask(initialSceneLoadTask, (scene) => {
      this.sceneManager.setActiveScene(scene);
    });

    // Attaches default control for toggling debug mode.
    this.inputController.addKeypressEventListener((e) => {
      if (e.key === 'm') this.toggleDebugMode();
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
