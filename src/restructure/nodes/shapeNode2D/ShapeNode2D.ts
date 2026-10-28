import type { Shape2D } from '../../domain/shape2D/shape2D.types';
import { Shape2D_Rectangle } from '../../domain/shape2D/Shape2D_Rectangle';
import { Signal } from '../../domain/signal/Signal';
import { Node2D } from '../node2D/Node2D';

/** A node that holds a 2D shape. */
export class ShapeNode2D extends Node2D {
  /** Emitted after the node's shape has been changed. The new shape is passed to callbacks. */
  public readonly shape_changed = new Signal<Shape2D>();
  private _shape: Shape2D = new Shape2D_Rectangle();

  /** The node's 2D shape. */
  public get shape() {
    return this._shape;
  }

  public set shape(shape: Shape2D) {
    this.setShape(shape);
    this.emitShapeChangedSignal(shape);
  }

  private setShape(shape: Shape2D) {
    this._shape = shape;
  }

  private emitShapeChangedSignal(shape: Shape2D) {
    this.shape_changed.emit(shape);
  }
}
