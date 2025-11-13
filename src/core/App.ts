import type { GraphicsConfiguration } from './Graphics';
import type { LoopConfiguration } from './Loop';
import { Graphics } from './Graphics';
import { Loop } from './Loop';

interface AppConfiguration {
  graphics: GraphicsConfiguration;
  loop: LoopConfiguration;
}

export class App {
  public readonly graphics: Graphics;
  public readonly loop: Loop;

  constructor(configuration: AppConfiguration) {
    this.graphics = new Graphics(configuration.graphics);
    this.loop = new Loop(configuration.loop);
  }

  public initialize() {
    const appElement = document.createElement('div');
    appElement.id = 'app';

    document.body.innerHTML = '';
    document.body.appendChild(appElement);

    this.graphics.initialize(appElement);
    this.loop.initialize(this.onLoop.bind(this));
  }

  public start() {
    this.loop.start();
  }

  public stop() {
    this.loop.stop();
  }

  public reset() {
    this.graphics.clear();
    this.loop.reset();
  }

  private onLoop(dt: number) {
    console.log(`Time since last frame: ${dt.toFixed(0)} ms`);
  }
}
