import { error, log } from '@core/utils/logger';
import { resetAudio, useAudio } from 'audio';
import { useConfig, toggleDebugMode } from 'config';
import { resetGraphics, useGraphics } from 'graphics';
import { resetInput, useInput } from 'input';
import { resetLoop, useLoop } from 'loop';
import { resetPhysics, usePhysics } from 'physics';
import { resetScenes, useScenes } from 'scenes';
import { resetTasks, useTasks } from 'tasks';
import { resetAssets } from './assets';
import { resetRenderer } from './renderer';

const LOG_TAG = 'game';

class Game {
  private isLoaded = false;

  /**
   * Sets up the game components and loads initial scene.
   */
  public setup() {
    log(LOG_TAG, 'Initializing...');
    const audio = useAudio();
    const config = useConfig();
    const graphics = useGraphics();
    const input = useInput();
    const loop = useLoop();
    const scenes = useScenes();
    const tasks = useTasks();

    loop.setLoopCallback(this.onLoop.bind(this));
    audio.initialize();
    graphics.syncWithGameCanvas();
    input.attachListeners();

    const loadScene = scenes.loadScene(config.game.splashScene);

    // Loads and sets initial scene.
    tasks.registerTask(loadScene, (scene) => {
      scenes.setActiveScene(scene);

      this.isLoaded = true;
    });

    // Attaches default controls for dev functions.
    input.addKeypressEventListener((e) => {
      switch (e.key) {
        case config.actions.toggleDebugMode:
          toggleDebugMode();
          break;
        case config.actions.restartGame:
          this.restart();
          break;
      }
    });
  }

  public teardown() {
    const input = useInput();

    input.detachListeners();
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

  /**
   * Restarts the game.
   */
  public restart() {
    this.stop();
    this.teardown();
    this.resetEngine();

    resetGame();

    const game = useGame();

    game.setup();
    game.start();
  }

  private get isReady() {
    const tasks = useTasks();

    return this.initialSceneLoadTaskId ? !tasks.isTaskActive(this.initialSceneLoadTaskId) : true;
  }

  private onLoop(dt: number) {
    if (!this.isReady) return;

    const graphics = useGraphics();
    const loop = useLoop();
    const physics = usePhysics();
    const scenes = useScenes();

    try {
      scenes.updateActiveScene(dt);
      physics.update();
      graphics.update();
    } catch (err) {
      error(LOG_TAG, String(err));

      loop.stop();
    }
  }

  private resetEngine() {
    resetAssets();
    resetAudio();
    resetGraphics();
    resetInput();
    resetLoop();
    resetPhysics();
    resetRenderer();
    resetScenes();
    resetTasks();
  }
}

let game = new Game();

export function useGame() {
  return game;
}

export function resetGame() {
  game = new Game();
}

export function setGame(_game: Game) {
  game = _game;
}
