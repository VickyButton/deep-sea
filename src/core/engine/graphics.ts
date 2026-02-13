// TODO: Refactor Graphics to reduce new instances of OffscreenCanvas.
import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { log } from '@core/utils/logger';
import { getConfig } from 'config';
import { getRenderer } from './renderer';

const LOG_TAG = 'Graphics';
const ERROR_MISSING_GAME_CANVAS = 'Unable to get game canvas';
const ERROR_MISSING_GAME_CONTEXT = 'No game rendering context defined';

export class Graphics {
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;

  /**
   * Iterates through visible nodes and draws each one.
   */
  public update() {
    if (!this.ctx) throw new Error(ERROR_MISSING_GAME_CONTEXT);

    this.clear();

    const renderer = getRenderer();

    for (const node of renderer.createDrawQueue()) {
      node.draw(this.ctx);
    }
  }

  /**
   * Fetches target canvas by ID and resizes to size defined in config.
   */
  public syncWithGameCanvas() {
    log(LOG_TAG, 'Syncing with target canvas...');
    const config = getConfig();

    const canvas = this.getGameCanvas();

    canvas.width = config.graphics.width;
    canvas.height = config.graphics.height;

    const ctx = getCanvasContext2D(canvas);

    this.canvas = canvas;
    this.ctx = ctx;
  }

  private clear() {
    if (!this.ctx) throw new Error(ERROR_MISSING_GAME_CONTEXT);

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private getGameCanvas() {
    const canvas = document.getElementById('game-canvas');

    if (!canvas) throw new Error(ERROR_MISSING_GAME_CANVAS);

    return canvas as HTMLCanvasElement;
  }
}

const graphics = new Graphics();

export function getGraphics() {
  return graphics;
}
