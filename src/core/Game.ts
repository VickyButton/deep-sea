import { useLoop } from '@core/engine/loop';
import { SceneManager } from '@core/engine/SceneManager';
import { TaskManager } from '@core/engine/TaskManager';
import { error, log } from '@core/utils/logger';
import { useAudio } from 'audio';
import { useConfig, toggleDebugMode } from 'config';
import { restartGame } from 'game';
import { useGraphics } from 'graphics';
import { InputController } from './engine/InputController';
import { Physics2D } from './engine/Physics2D';

const LOG_TAG = 'Game';

export class Game {
  // TODO: Move asset manager, graphics, etc. into own modules similar to config.
  public readonly inputController = new InputController();
  public readonly physics = new Physics2D();
  public readonly sceneManager = new SceneManager();
  public readonly taskManager = new TaskManager();
  private initialSceneLoadTaskId?: string;

  /**
   * Sets up the game components and loads initial scene.
   */
  public setup() {
    log(LOG_TAG, 'Initializing...');
    const audio = useAudio();
    const config = useConfig();
    const graphics = useGraphics();
    const loop = useLoop();

    loop.setLoopCallback(this.onLoop.bind(this));
    audio.initialize();
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
    const loop = useLoop();

    loop.start();
  }

  /**
   * Stops the game loop.
   */
  public stop() {
    log(LOG_TAG, 'Stopping...');
    const loop = useLoop();

    loop.stop();
  }

  private get isReady() {
    return this.initialSceneLoadTaskId
      ? !this.taskManager.isTaskActive(this.initialSceneLoadTaskId)
      : true;
  }

  private onLoop(dt: number) {
    if (!this.isReady) return;

    const graphics = useGraphics();
    const loop = useLoop();

    try {
      this.sceneManager.updateActiveScene(dt);
      this.physics.update();
      graphics.update();
    } catch (err) {
      error(LOG_TAG, String(err));

      loop.stop();
    }
  }
}
