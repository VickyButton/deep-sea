import type { GraphicsConfiguration } from './Graphics';
import type { LoopConfiguration } from './Loop';
import { Graphics } from './Graphics';
import { Loop } from './Loop';

interface GameConfiguration {
  graphics: GraphicsConfiguration;
  loop: LoopConfiguration;
}

export class Game {
  public readonly graphics: Graphics;
  public readonly loop: Loop;

  constructor(configuration: GameConfiguration) {
    this.graphics = new Graphics(configuration.graphics);
    this.loop = new Loop(configuration.loop);
  }

  public initialize(targetCanvas: HTMLCanvasElement) {
    this.graphics.initialize(targetCanvas);
    this.loop.initialize(this.onLoop.bind(this));
  }

  public start() {
    this.loop.start();
  }

  private onLoop() {
    this.graphics.draw();
  }
}
