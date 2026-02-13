import { Audio } from '@core/engine/Audio';
import { getGraphics } from '@core/engine/graphics';
import { Loop } from '@core/engine/Loop';
import { SceneManager } from '@core/engine/SceneManager';
import { TaskManager } from '@core/engine/TaskManager';
import { error, log } from '@core/utils/logger';
import { getConfig, toggleDebugMode } from 'config';
import { restartGame } from 'game';
import { InputController } from './engine/InputController';
import { Physics2D } from './engine/Physics2D';

const LOG_TAG = 'Game';

export class Game {
  // TODO: Move asset manager, graphics, etc. into own modules similar to config.
  public readonly audio = new Audio();
  public readonly inputController = new InputController();
  public readonly loop = new Loop();
  public readonly physics = new Physics2D();
  public readonly sceneManager = new SceneManager();
  public readonly taskManager = new TaskManager();
  private initialSceneLoadTaskId?: string;

  /**
   * Sets up the game components and loads initial scene.
   */
  public setup() {
    log(LOG_TAG, 'Initializing...');
    const config = getConfig();
    const graphics = getGraphics();

    this.loop.setLoopCallback(this.onLoop.bind(this));
    this.audio.initialize();
    graphics.syncWithGameCanvas();
    this.inputController.attachListeners();

    const initialSceneLoadTask = this.sceneManager.loadScene(config.game.splashScene);

    // Loads and sets initial scene.
    this.initialSceneLoadTaskId = this.taskManager.registerTask(initialSceneLoadTask, (scene) => {
      this.sceneManager.setActiveScene(scene);
    });

    // Attaches default controls for dev functions.
    this.inputController.addKeypressEventListener((e) => {
      switch (e.key) {
        case config.actions.toggleDebugMode:
          toggleDebugMode();
          break;
        case config.actions.restartGame:
          restartGame();
          break;
      }
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

    const graphics = getGraphics();

    try {
      this.sceneManager.updateActiveScene(dt);
      this.physics.update();
      graphics.update();
    } catch (err) {
      error(LOG_TAG, String(err));

      this.loop.stop();
    }
  }
}
