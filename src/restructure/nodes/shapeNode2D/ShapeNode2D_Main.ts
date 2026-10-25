import type { ShapeNode2D } from './shapeNode2D.types';
import type { DrawInstructionsBuilder } from '../../domain/drawInstructions/builder/DrawInstructionsBuilder';
import type { Shape2D } from '../../domain/shape2D/shape2D.types';
import { Shape2D_Rectangle } from '../../domain/shape2D/Shape2D_Rectangle';
import { Signal } from '../../domain/signal/Signal';
import { Node2D } from '../node2D/Node2D';

/** The base implementation of the ShapeNode2D interface. */
export class ShapeNode2D_Main extends Node2D implements ShapeNode2D {
  public readonly shape_changed = new Signal<Shape2D>();
  private _shape: Shape2D = new Shape2D_Rectangle();

  constructor(id: string) {
    super(id);

    this.setDrawCallback(this.onDraw);
  }

  private onDraw = (builder: DrawInstructionsBuilder) => {
    builder.beginPath();
    builder.setTransform(...this.getTransformationMatrix());

    for (const step of this.shape.drawSteps) {
      builder.addStep(step);
    }

    builder.resetTransform();
    // TODO: Remove debug stroke color and stroke call.
    builder.setStrokeColor('rgb(0,0,0)');
    builder.closePath();
    builder.stroke();
  };

  private getTransformationMatrix() {
    const matrix = this.globalTransform.computeTransformationMatrix();

    return [matrix[0][0], matrix[0][1], matrix[1][0], matrix[1][1], matrix[2][0], matrix[2][1]] as const;
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
