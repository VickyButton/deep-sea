import { Point2D } from './interfaces/Point2D';

interface DrawInstructions {
  imageBitmap: ImageBitmap;
  position: Point2D;
  layer: number;
}

export interface GraphicsConfiguration {
  width: number;
  height: number;
}

export class Graphics {
  private readonly configuration: GraphicsConfiguration;
  private targetCanvas?: HTMLCanvasElement;
  private targetContext?: ImageBitmapRenderingContext;
  private drawQueue = new Map<number, DrawInstructions[]>();

  constructor(configuration: GraphicsConfiguration) {
    this.configuration = configuration;
  }

  public initialize(targetCanvas: HTMLCanvasElement) {
    targetCanvas.width = this.width;
    targetCanvas.height = this.height;

    const targetContext = targetCanvas.getContext('bitmaprenderer');

    if (!targetContext) throw new Error('Could not get target context');

    this.targetContext = targetContext;
  }

  public clear() {
    if (!this.targetContext) return;

    const canvas = new OffscreenCanvas(this.width, this.height);
    const imageBitmap = canvas.transferToImageBitmap();

    this.targetContext.transferFromImageBitmap(imageBitmap);
  }

  public addToDrawQueue(drawInstructions: DrawInstructions) {
    if (!this.drawQueue.has(drawInstructions.layer)) this.drawQueue.set(drawInstructions.layer, []);

    this.drawQueue.get(drawInstructions.layer)?.push(drawInstructions);
  }

  public draw() {
    if (!this.targetContext) return;

    const canvas = new OffscreenCanvas(this.width, this.height);
    const canvasContext = canvas.getContext('2d');

    for (const layer of this.drawQueue.values()) {
      const layerCanvas = new OffscreenCanvas(this.width, this.height);
      const layerContext = layerCanvas.getContext('2d');

      for (const drawInstructions of layer) {
        const dx = drawInstructions.position.x - drawInstructions.imageBitmap.width / 2;
        const dy = drawInstructions.position.y - drawInstructions.imageBitmap.height / 2;

        layerContext?.drawImage(drawInstructions.imageBitmap, dx, dy);
      }

      canvasContext?.drawImage(layerCanvas, 0, 0);
    }

    const imageBitmap = canvas.transferToImageBitmap();

    this.targetContext.transferFromImageBitmap(imageBitmap);
  }

  public get width() {
    return this.configuration.width;
  }

  public get height() {
    return this.configuration.height;
  }
}
