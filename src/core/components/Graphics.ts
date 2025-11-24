import { Vector2D } from '@core/entities/Vector2D';
import { log } from '../utils/logger';

interface DrawInstructions {
  imageBitmap: ImageBitmap;
  position: Vector2D;
  layer: number;
}

export interface GraphicsConfiguration {
  size: Vector2D;
}

const LOG_TAG = 'Graphics';
const ERROR_MISSING_TARGET_CANVAS = 'Unable to get target canvas';
const ERROR_MISSING_TARGET_CONTEXT = 'Unable to get target context';

export class Graphics {
  private readonly configuration: GraphicsConfiguration;
  private targetCanvas?: HTMLCanvasElement;
  private targetContext?: ImageBitmapRenderingContext;
  private drawQueue = new Map<number, DrawInstructions[]>();

  constructor(configuration: GraphicsConfiguration) {
    this.configuration = configuration;
  }

  /**
   * The width of the target canvas.
   */
  public get width() {
    return this.targetCanvas ? this.targetCanvas.width : 0;
  }

  /**
   * The height of the target canvas.
   */
  public get height() {
    return this.targetCanvas ? this.targetCanvas.height : 0;
  }

  /**
   * Fetches target canvas by ID and resizes to size defined in configuration.
   */
  public syncWithTargetCanvas() {
    log(LOG_TAG, 'Syncing with target canvas...');

    const targetCanvas = this.getTargetCanvas();

    targetCanvas.width = this.configuration.size.x;
    targetCanvas.height = this.configuration.size.y;

    const targetContext = targetCanvas.getContext('bitmaprenderer');

    if (!targetContext) throw new Error(ERROR_MISSING_TARGET_CONTEXT);

    this.targetCanvas = targetCanvas;
    this.targetContext = targetContext;
  }

  /**
   * Resets target canvas to a blank canvas.
   */
  public clear() {
    if (!this.targetContext) throw new Error(ERROR_MISSING_TARGET_CONTEXT);

    const canvas = new OffscreenCanvas(this.width, this.height);
    const imageBitmap = canvas.transferToImageBitmap();

    this.targetContext.transferFromImageBitmap(imageBitmap);
  }

  /**
   * Adds drawing instructions to the draw queue for rendering on the next frame.
   *
   * @param drawInstructions Instructions for what to draw and where to draw it.
   */
  public addToDrawQueue(drawInstructions: DrawInstructions) {
    if (!this.drawQueue.has(drawInstructions.layer)) this.drawQueue.set(drawInstructions.layer, []);

    this.drawQueue.get(drawInstructions.layer)?.push(drawInstructions);
  }

  /**
   * Iterates through draw queue to render frame and clears drawing queue after.
   */
  public draw() {
    if (!this.targetContext) throw new Error(ERROR_MISSING_TARGET_CONTEXT);

    const canvas = new OffscreenCanvas(this.width, this.height);
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Unable to get rendering context');

    const sortedDrawQueue = new Map([...this.drawQueue.entries()].sort());

    for (const layer of sortedDrawQueue.values()) {
      const layerCanvas = new OffscreenCanvas(this.width, this.height);
      const layerContext = layerCanvas.getContext('2d');

      for (const drawInstructions of layer) {
        const dx = drawInstructions.position.x - drawInstructions.imageBitmap.width / 2;
        const dy = drawInstructions.position.y - drawInstructions.imageBitmap.height / 2;

        layerContext?.drawImage(drawInstructions.imageBitmap, dx, dy);
      }

      context.drawImage(layerCanvas, 0, 0);
    }

    const imageBitmap = canvas.transferToImageBitmap();

    this.targetContext.transferFromImageBitmap(imageBitmap);
    this.clearDrawQueue();
  }

  private getTargetCanvas() {
    const targetCanvas = document.getElementById('game-canvas');

    if (!targetCanvas) throw new Error(ERROR_MISSING_TARGET_CANVAS);

    return targetCanvas as HTMLCanvasElement;
  }

  private clearDrawQueue() {
    this.drawQueue.clear();
  }
}
