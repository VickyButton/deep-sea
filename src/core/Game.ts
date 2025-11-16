import type { GraphicsConfiguration } from './Graphics';
import type { LoopConfiguration } from './Loop';
import type { SceneManagerConfiguration } from './SceneManager';
import { Graphics } from './Graphics';
import { Loop } from './Loop';
import { SceneManager } from './SceneManager';
import { log } from './utils/logger';

interface GameConfiguration {
  graphics: GraphicsConfiguration;
  loop: LoopConfiguration;
  sceneManager: SceneManagerConfiguration;
}

const GAME_LOG_TAG = 'Game';

export class Game {
  public readonly graphics: Graphics;
  public readonly loop: Loop;
  public readonly sceneManager: SceneManager;

  constructor(configuration: GameConfiguration) {
    this.graphics = new Graphics(configuration.graphics);
    this.loop = new Loop(configuration.loop);
    this.sceneManager = new SceneManager(configuration.sceneManager);
  }

  public initialize(targetCanvas: HTMLCanvasElement) {
    log(GAME_LOG_TAG, 'Initializing...');

    this.graphics.initialize(targetCanvas);
    this.loop.initialize(this.onLoop.bind(this));
    this.sceneManager.initialize();
  }

  public start() {
    log(GAME_LOG_TAG, 'Starting...');

    this.loop.start();
  }

  public stop() {
    log(GAME_LOG_TAG, 'Stopping...');

    this.loop.stop();
  }

  private onLoop(dt: number) {
    this.sceneManager.updateActiveScene(dt);
    this.graphics.draw();
  }
}
