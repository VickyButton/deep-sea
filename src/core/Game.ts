import type { GraphicsConfiguration } from './Graphics';
import type { LoopConfiguration } from './Loop';
import { Graphics } from './Graphics';
import { Loop } from './Loop';
import { log } from './utils/logger';

interface GameConfiguration {
  graphics: GraphicsConfiguration;
  loop: LoopConfiguration;
}

const GAME_LOG_TAG = 'Game';

export class Game {
  public readonly graphics: Graphics;
  public readonly loop: Loop;

  constructor(configuration: GameConfiguration) {
    this.graphics = new Graphics(configuration.graphics);
    this.loop = new Loop(configuration.loop);
  }

  public initialize(targetCanvas: HTMLCanvasElement) {
    log(GAME_LOG_TAG, 'Initializing...');

    this.graphics.initialize(targetCanvas);
    this.loop.initialize(this.onLoop.bind(this));
  }

  public start() {
    log(GAME_LOG_TAG, 'Starting...');

    this.loop.start();
  }

  private onLoop() {
    this.graphics.draw();
  }
}
