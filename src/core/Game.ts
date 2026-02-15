import { useScenes } from '@core/engine/scenes';
import { error, log } from '@core/utils/logger';
import { useAudio } from 'audio';
import { useConfig, toggleDebugMode } from 'config';
import { restartGame } from 'game';
import { useGraphics } from 'graphics';
import { useInput } from 'input';
import { useLoop } from 'loop';
import { usePhysics } from 'physics';
import { useTasks } from 'tasks';

const LOG_TAG = 'Game';

export class Game {
  // TODO: Move asset manager, graphics, etc. into own modules similar to config.
  private initialSceneLoadTaskId?: string;

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

    const initialSceneLoadTask = scenes.loadScene(config.game.splashScene);

    // Loads and sets initial scene.
    this.initialSceneLoadTaskId = tasks.registerTask(initialSceneLoadTask, (scene) => {
      scenes.setActiveScene(scene);
    });

    // Attaches default controls for dev functions.
    input.addKeypressEventListener((e) => {
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
}
