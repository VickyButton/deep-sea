import type { Node2DEvents } from './Node2D';
import type { Canvas } from '../domain/canvases/Canvas';
import type { Color } from '../domain/colors/Color';
import type { Shape2D } from '../domain/shapes/Shape2D';
import { Node2D } from './Node2D';
import { RGBA } from '../domain/colors/RGBA';
import { RectangleShape2D } from '../domain/shapes/RectangleShape2D';

export class ShapeNode2D<Events extends ShapeNode2DEvents = ShapeNode2DEvents> extends Node2D<Events> {
  /** The node's shape. */
  public shape: Shape2D = new RectangleShape2D();
  /** The shape's outline color. */
  public outlineColor: Color = RGBA.BLACK;

  public draw(canvas: Canvas) {
    // TODO: Create method for converting world position to canvas position (negating position Y component).
    this.beginDrawingPath(canvas);
    this.setShapeOutlineColor(canvas);
    this.setTransformationMatrix(canvas);
    this.drawShape(canvas);
    this.resetTransformationMatrix(canvas);
    this.closeDrawingPath(canvas);
    this.strokeShapeOutline(canvas);
  }

  protected drawShape(canvas: Canvas) {
    this.shape.draw(canvas);
  }

  protected setShapeOutlineColor(canvas: Canvas) {
    canvas.setStrokeColor(this.outlineColor.toString());
  }

  protected strokeShapeOutline(canvas: Canvas) {
    canvas.stroke();
  }

  public setup() {
    // TODO: Register in Physics Engine.
    // TODO: Add new loop event listener to queue redraw.
  }

  protected onNewFrame = () => {
    // TODO: Temp, replace later.
    this.queueRedraw();
  };
}

export type ShapeNode2DEvents = Node2DEvents;
