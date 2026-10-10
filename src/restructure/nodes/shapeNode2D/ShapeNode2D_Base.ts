import type { ShapeNode2D } from './shapeNode2D.types';
import type { Shape2D } from '../../domain/shapes';
import type { NodeDependencies } from '../node/node.types';
import { RectangleShape2D } from '../../domain/shapes';
import { Node2D_Base } from '../node2D/Node2D_Base';

/** The base implementation of the ShapeNode2D interface. */
export class ShapeNode2D_Base extends Node2D_Base implements ShapeNode2D {
  public readonly shape_changed;
  private _shape: Shape2D = new RectangleShape2D();

  constructor(id: string, dependencies: NodeDependencies) {
    super(id, dependencies);

    const { Signal } = dependencies;
    this.shape_changed = new Signal<Shape2D>();
  }

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
