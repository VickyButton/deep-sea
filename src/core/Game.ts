import type { CameraConfiguration } from './Camera';
import type { GraphicsConfiguration } from './Graphics';
import type { LoopConfiguration } from './Loop';
import type { SceneManagerConfiguration } from './SceneManager';
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
  sceneManager: SceneManagerConfiguration;
}

const LOG_TAG = 'Game';

export class Game {
  public readonly audio: Audio;
  public readonly camera: Camera;
  public readonly graphics: Graphics;
  public readonly loop: Loop;
  public readonly sceneManager: SceneManager;
  public readonly taskManager: TaskManager;

  constructor(configuration: GameConfiguration) {
    this.audio = new Audio();
    this.camera = new Camera(configuration.camera);
    this.graphics = new Graphics(configuration.graphics);
    this.loop = new Loop(configuration.loop);
    this.sceneManager = new SceneManager(configuration.sceneManager);
    this.taskManager = new TaskManager();
  }

  public initialize() {
    log(LOG_TAG, 'Initializing...');

    this.graphics.initialize();
    this.loop.initialize(this.onLoop.bind(this));
    this.sceneManager.initialize();
  }

  public start() {
    log(LOG_TAG, 'Starting...');

    this.loop.start();
  }

  public stop() {
    log(LOG_TAG, 'Stopping...');

    this.loop.stop();
  }

  private onLoop(dt: number) {
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
