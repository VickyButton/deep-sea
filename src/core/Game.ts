import type { GraphicsConfiguration } from './Graphics';
import { Graphics } from './Graphics';

interface GameConfiguration {
  graphics: GraphicsConfiguration;
}

export class Game {
  public readonly graphics: Graphics;

  constructor(configuration: GameConfiguration) {
    this.graphics = new Graphics(configuration.graphics);
  }

  public initialize(targetCanvas: HTMLCanvasElement) {
    this.graphics.initialize(targetCanvas);
  }
}
