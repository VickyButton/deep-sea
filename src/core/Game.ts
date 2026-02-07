import { Audio } from '@core/engine/Audio';
import { Graphics } from '@core/engine/Graphics';
import { Loop } from '@core/engine/Loop';
import { SceneManager } from '@core/engine/SceneManager';
import { TaskManager } from '@core/engine/TaskManager';
import { error, log } from '@core/utils/logger';
import { getConfig, toggleDebugMode } from 'config';
import { setGame } from 'game';
import { InputController } from './engine/InputController';
import { Physics2D } from './engine/Physics2D';
import { SpriteSheetManager } from './engine/SpriteSheetManager';

const LOG_TAG = 'Game';

export class Game {
  public readonly audio = new Audio();
  public readonly graphics = new Graphics();
  public readonly inputController = new InputController();
  public readonly loop = new Loop();
  public readonly physics = new Physics2D();
  public readonly sceneManager = new SceneManager();
  public readonly spriteSheetManager = new SpriteSheetManager();
  public readonly taskManager = new TaskManager();
  private initialSceneLoadTaskId?: string;

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
      if (e.key === 'm') toggleDebugMode();
      if (e.key === 'p') this.restart();
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

  public restart() {
    log(LOG_TAG, 'Restarting...');

    this.stop();
    this.teardown();

    const newGame = new Game();

    setGame(newGame);

    newGame.setup();
    newGame.start();
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
