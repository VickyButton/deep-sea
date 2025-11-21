import { Node } from '@core/entities/Node';
import { log } from '@core/utils/logger';
import { game } from 'game';

interface FpsCounterState {
  currentFramesPerSecond: number;
}

const LOG_TAG = 'FpsCounter';

export default class FpsCounter extends Node<FpsCounterState> {
  public setup(): void {
    log(LOG_TAG, 'Initializing FpsCounter...');
  }

  public update(dt: number): void {
    this.state.currentFramesPerSecond = Math.floor(1000 / dt);
    this.render();
  }

  private render() {
    const width = 100;
    const height = 20;
    const textCanvas = new OffscreenCanvas(width, height);
    const textContext = textCanvas.getContext('2d');

    if (!textContext) return;

    textContext.font = `${String(height)}px Verdana`;

    textContext.fillStyle = 'white';
    textContext.fillText(`FPS: ${String(this.state.currentFramesPerSecond)}`, 0, height);

    const imageBitmap = textCanvas.transferToImageBitmap();

    game.graphics.addToDrawQueue({
      imageBitmap,
      position: {
        x: width / 2,
        y: height / 2,
      },
      layer: 1,
    });
  }

  protected getDefaultState() {
    return {
      currentFramesPerSecond: 0,
    };
  }
}
