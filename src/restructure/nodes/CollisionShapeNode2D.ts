import type { Node2D_Options } from './Node2D';
import type { Canvas } from '../domain/canvases/Canvas';
import type { Color } from '../domain/colors/Color';
import type { Shape2D } from '../domain/shapes/Shape2D';
import { Node2D } from './Node2D';
import { RGBA } from '../domain/colors/RGBA';
import { RectangleShape2D } from '../domain/shapes/RectangleShape2D';
import { NewFrameEvent } from '../events';

export class CollisionShapeNode2D extends Node2D {
  /** The node's collision shape. */
  public shape: Shape2D;
  /** The collision shape's outline color in debug mode. */
  public outlineColor: Color;

  constructor(id: string, options?: CollisionShapeNode2D_Options) {
    super(id, options);

    this.shape = options?.shape ?? new RectangleShape2D();
    this.outlineColor = options?.outlineColor ?? new RGBA();
  }

  /**
   * Checks if this node's collision shape is colliding with another node's collision shape.
   * @param node The node to check collision against.
   * @returns True if the the nodes' collision shapes are colliding, false if not.
   */
  public isCollidingWith(node: CollisionShapeNode2D) {
    return this.shape.isCollidingWith(this.globalTransform, node.shape, node.globalTransform);
  }

  public draw(canvas: Canvas) {
    // TODO: Create method for converting world position to canvas position (negating position Y component).
    this.beginDrawingPath(canvas);
    this.setTransformationMatrix(canvas);
    this.drawShape(canvas);
    this.resetTransformationMatrix(canvas);
    this.setShapeOutlineColor(canvas);
    this.strokeShapeOutline(canvas);
    this.closeDrawingPath(canvas);
  }

  private drawShape(canvas: Canvas) {
    this.shape.draw(canvas);
  }

  private setShapeOutlineColor(canvas: Canvas) {
    canvas.setStrokeColor(this.outlineColor.toString());
  }

  private strokeShapeOutline(canvas: Canvas) {
    canvas.stroke();
  }

  public setup() {
    // TODO: Register in Physics Engine.
    this.addEventListener(NewFrameEvent, this.onNewFrame);
  }

  private onNewFrame = () => {
    // TODO: Temp, replace later.
    this.queueRedraw();
  };
}

interface CollisionShapeNode2D_Options extends Node2D_Options {
  shape?: Shape2D;
  outlineColor?: Color;
}
