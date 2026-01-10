import { Camera2D } from '@core/nodes/Camera2D';
import { GraphicsNode2D } from '@core/nodes/GraphicsNode2D';
import { Vector2D } from '@core/structures/Vector2D';
import { log } from '@core/utils/logger';

interface DrawInstructions {
  imageBitmap: ImageBitmap;
  position: Vector2D;
  rotation: Vector2D;
  scale: Vector2D;
  layer: number;
}

export interface GraphicsConfiguration {
  size: Vector2D;
}

type Layer = DrawInstructions[];

const LOG_TAG = 'Graphics';
const ERROR_MISSING_TARGET_CANVAS = 'Unable to get target canvas';
const ERROR_MISSING_TARGET_CONTEXT = 'Unable to get target context';

export class Graphics {
  private readonly configuration: GraphicsConfiguration;
  private camera?: Camera2D;
  private nodes = new Set<GraphicsNode2D>();
  private targetCanvas?: HTMLCanvasElement;
  private targetContext?: ImageBitmapRenderingContext;
  private drawQueue = new Map<number, Layer>();

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
  public setCamera(camera: Camera2D) {
    this.camera = camera;
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
      context.drawImage(this.renderLayer(layer), 0, 0);
    }

    const imageBitmap = canvas.transferToImageBitmap();

    this.targetContext.transferFromImageBitmap(imageBitmap);
    this.clearDrawQueue();
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
        scale: node.globalScale,
        layer: node.globalLayer,
      });
    }
  }

  private renderLayer(layer: Layer) {
    const layerCanvas = new OffscreenCanvas(this.width, this.height);
    const layerContext = layerCanvas.getContext('2d');

    if (!layerContext) throw new Error('Unable to get rendering context');

    for (const drawInstructions of layer) {
      this.drawOntoLayer(layerContext, drawInstructions);
    }

    return layerCanvas;
  }

  private drawOntoLayer(
    layerContext: OffscreenCanvasRenderingContext2D,
    drawInstructions: DrawInstructions,
  ) {
    const size = new Vector2D(
      drawInstructions.imageBitmap.width,
      drawInstructions.imageBitmap.height,
    );
    const scaledSize = Vector2D.multiply(drawInstructions.scale, size);
    const dWidth = scaledSize.x;
    const dHeight = scaledSize.y;
    const dx = drawInstructions.position.x + dWidth / 2;
    const dy = drawInstructions.position.y + dHeight / 2;

    // Apply transformations.
    layerContext.translate(dx, dy);
    layerContext.rotate(-drawInstructions.rotation.x);

    // Draw image.
    layerContext.imageSmoothingEnabled = false;
    layerContext.drawImage(
      drawInstructions.imageBitmap,
      -dWidth / 2,
      -dHeight / 2,
      dWidth,
      dHeight,
    );

    // Apply inverse transformations.
    layerContext.rotate(drawInstructions.rotation.x);
    layerContext.translate(-dx, -dy);
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
