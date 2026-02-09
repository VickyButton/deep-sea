import { CameraNode2D } from '@core/nodes/CameraNode2D';
import { GraphicsNode2D } from '@core/nodes/GraphicsNode2D';
import { Vector2D } from '@core/structures/Vector2D';
import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { log } from '@core/utils/logger';
import { getConfig } from 'config';

interface DrawInstructions {
  imageBitmap: ImageBitmap;
  position: Vector2D;
  rotation: Vector2D;
  layer: number;
}

const LOG_TAG = 'Graphics';
const ERROR_MISSING_TARGET_CANVAS = 'Unable to get target canvas';
const ERROR_MISSING_TARGET_CONTEXT = 'Unable to get target context';

export class Graphics {
  private camera?: CameraNode2D;
  private nodes = new Set<GraphicsNode2D>();
  private targetCanvas?: HTMLCanvasElement;
  private targetCtx?: ImageBitmapRenderingContext;
  private drawQueue = new Map<number, DrawInstructions[]>();

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
   * Registers a node to be considered for rendering each frame.
   *
   * @param node The node to register.
   */
  public registerNode(node: GraphicsNode2D) {
    this.nodes.add(node);
  }

  /**
   * Deregisters a node from consideration for rendering each frame.
   *
   * @param node The node to deregister.
   */
  public deregisterNode(node: GraphicsNode2D) {
    this.nodes.delete(node);
  }

  /**
   * Sets a camera to be used for bounding.
   *
   * @param camera The camera to use.
   */
  public setCamera(camera: CameraNode2D) {
    this.camera = camera;
  }

  /**
   * Fetches target canvas by ID and resizes to size defined in config.
   */
  public syncWithTargetCanvas() {
    log(LOG_TAG, 'Syncing with target canvas...');
    const config = getConfig();

    const targetCanvas = this.getTargetCanvas();

    targetCanvas.width = config.graphics.width;
    targetCanvas.height = config.graphics.height;

    const targetCtx = targetCanvas.getContext('bitmaprenderer');

    if (!targetCtx) throw new Error(ERROR_MISSING_TARGET_CONTEXT);

    this.targetCanvas = targetCanvas;
    this.targetCtx = targetCtx;
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
    if (!this.targetCtx) throw new Error(ERROR_MISSING_TARGET_CONTEXT);

    const canvas = new OffscreenCanvas(this.width, this.height);
    const ctx = getCanvasContext2D(canvas);
    const sortedDrawQueue = new Map([...this.drawQueue.entries()].sort());

    for (const layer of sortedDrawQueue.values()) {
      ctx.drawImage(this.renderLayer(layer), 0, 0);
    }

    const imageBitmap = canvas.transferToImageBitmap();

    this.targetCtx.transferFromImageBitmap(imageBitmap);
    this.clearDrawQueue();

    imageBitmap.close();
  }

  /**
   * Iterates through visible nodes and creates draw instructions for them.
   */
  public update() {
    if (!this.camera) throw new Error('No camera set');

    for (const node of this.getVisibleNodes()) {
      this.addToDrawQueue({
        imageBitmap: node.render(),
        position: this.getPositionRelativeToCamera(node.globalPosition),
        rotation: node.globalRotation,
        layer: node.globalLayer,
      });
    }
  }

  private renderLayer(layer: DrawInstructions[]) {
    const layerCanvas = new OffscreenCanvas(this.width, this.height);
    const layerCtx = getCanvasContext2D(layerCanvas);

    for (const drawInstructions of layer) {
      this.drawOntoLayer(layerCtx, drawInstructions);
    }

    return layerCanvas;
  }

  private drawOntoLayer(
    layerCtx: OffscreenCanvasRenderingContext2D,
    drawInstructions: DrawInstructions,
  ) {
    const size = new Vector2D(
      drawInstructions.imageBitmap.width,
      drawInstructions.imageBitmap.height,
    );
    const dWidth = size.x;
    const dHeight = size.y;
    const dx = drawInstructions.position.x + dWidth / 2;
    const dy = drawInstructions.position.y + dHeight / 2;

    // Apply transformations.
    layerCtx.translate(dx, dy);
    layerCtx.rotate(-drawInstructions.rotation.x);

    // Draw image.
    layerCtx.drawImage(drawInstructions.imageBitmap, -dWidth / 2, -dHeight / 2, dWidth, dHeight);

    drawInstructions.imageBitmap.close();

    // Apply inverse transformations.
    layerCtx.rotate(drawInstructions.rotation.x);
    layerCtx.translate(-dx, -dy);
  }

  private getVisibleNodes() {
    const visibleNodes = new Set<GraphicsNode2D>();

    for (const node of this.nodes) {
      if (this.isNodeVisible(node)) visibleNodes.add(node);
    }

    return visibleNodes;
  }

  private isNodeVisible(node: GraphicsNode2D) {
    return node.globalVisible && !this.isNodeOffScreen(node);
  }

  private isNodeOffScreen(node: GraphicsNode2D) {
    if (!this.camera) throw new Error('No camera set');

    return !this.camera.rectangle.overlaps(node.boundingBox);
  }

  private getPositionRelativeToCamera(position: Vector2D) {
    if (!this.camera) throw new Error('No camera set');

    return Vector2D.subtract(position, this.camera.position);
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
