import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { log } from '@core/utils/logger';
import { useConfig } from 'config';
import { useRenderer } from './renderer';

const LOG_TAG = 'Graphics';
const ERROR_MISSING_GAME_CANVAS = 'Unable to get game canvas';
const ERROR_MISSING_GAME_CONTEXT = 'No game rendering context defined';

export class Graphics {
  private canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;

  public get ctx() {
    if (!this._ctx) throw new Error(ERROR_MISSING_GAME_CONTEXT);

    return this._ctx;
  }

  /**
   * Iterates through visible nodes and draws each one.
   */
  public update() {
    this.clear();

    const renderer = useRenderer();

    for (const node of renderer.createDrawQueue()) {
      node.draw();
    }
  }

  /**
   * Fetches target canvas by ID and resizes to size defined in config.
   */
  public syncWithGameCanvas() {
    log(LOG_TAG, 'Syncing with target canvas...');
    const config = useConfig();

    const canvas = this.getGameCanvas();

    canvas.width = config.graphics.width;
    canvas.height = config.graphics.height;

    const ctx = getCanvasContext2D(canvas);

    this.canvas = canvas;
    this._ctx = ctx;
  }

  public drawCircle(x: number, y: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
  }

  public drawRectangle(x: number, y: number, width: number, height: number) {
    this.ctx.rect(x, y, width, height);
  }

  public fill(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  public stroke(color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  public drawImage(
    image: ImageBitmap,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ) {
    this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  public enableImageSmoothing() {
    this.ctx.imageSmoothingEnabled = true;
  }

  public disableImageSmoothing() {
    this.ctx.imageSmoothingEnabled = false;
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private getGameCanvas() {
    const canvas = document.getElementById('game-canvas');

    if (!canvas) throw new Error(ERROR_MISSING_GAME_CANVAS);

    return canvas as HTMLCanvasElement;
  }
}

const graphics = new Graphics();

export function useGraphics() {
  return graphics;
}
