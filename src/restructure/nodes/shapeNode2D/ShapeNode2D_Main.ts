import type { ShapeNode2D } from './shapeNode2D.types';
import type { Shape2D } from '../../domain/shapes/Shape2D';
import { RectangleShape2D } from '../../domain/shapes/RectangleShape2D';
import { Signal_Main } from '../../domain/signals/signal/Signal_Main';
import { Node2D_Main } from '../node2D/Node2D_Main';

/** The base implementation of the ShapeNode2D interface. */
export class ShapeNode2D_Main extends Node2D_Main implements ShapeNode2D {
  public readonly shape_changed = new Signal_Main<Shape2D>();
  private _shape: Shape2D = new RectangleShape2D();

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
