import type { Shape2D } from './shape2D.types';
import type { DrawStep_DrawRectangle } from '../drawStep/drawStep.types';
import type { Transform2D } from '../transform2D/Transform2D';
import { Vector2D } from '../vector2D/Vector2D';
import { CollisionResolver2D_Rectangle } from './collisionResolver2D/CollisionResolver2D_Rectangle';

/** The rectangle implementation of the Shape2D interface. */
export class Shape2D_Rectangle implements Shape2D {
  /** The width of the rectangle. */
  public width: number;
  /** The height of the rectangle. */
  public height: number;

  constructor(width = 1, height = 1) {
    this.width = width;
    this.height = height;
  }

  public get boundingBox() {
    return this.vertices;
  }

  private get halfWidth() {
    return this.computeHalfWidth();
  }

  private computeHalfWidth() {
    return 0.5 * this.width;
  }

  private get halfHeight() {
    return this.computeHalfHeight();
  }

  private computeHalfHeight() {
    return 0.5 * this.height;
  }

  private computeTopRightVertex(halfWidth: number, halfHeight: number) {
    return new Vector2D(halfWidth, halfHeight);
  }

  private computeTopLeftVertex(halfWidth: number, halfHeight: number) {
    return new Vector2D(-halfWidth, halfHeight);
  }

  private computeBottomLeftVertex(halfWidth: number, halfHeight: number) {
    return new Vector2D(-halfWidth, -halfHeight);
  }

  private computeBottomRightVertex(halfWidth: number, halfHeight: number) {
    return new Vector2D(halfWidth, -halfHeight);
  }

  public get drawSteps() {
    return this.computeDrawSteps();
  }

  private computeDrawSteps() {
    return [this.computeDrawRectangleStep()];
  }

  private computeDrawRectangleStep(): DrawStep_DrawRectangle {
    const topLeftVertex = this.computeTopLeftVertex(this.halfWidth, this.halfHeight);

    return {
      type: 'DRAW_RECTANGLE',
      x: topLeftVertex.x,
      y: topLeftVertex.y,
      width: this.width,
      height: this.height,
    };
  }

  /** The vertices of the rectangle, in counterclockwise order. */
  public get vertices() {
    return this.computeVertices();
  }

  private computeVertices(): [Vector2D, Vector2D, Vector2D, Vector2D] {
    const { halfWidth, halfHeight } = this;

    return [
      this.computeTopRightVertex(halfWidth, halfHeight),
      this.computeTopLeftVertex(halfWidth, halfHeight),
      this.computeBottomLeftVertex(halfWidth, halfHeight),
      this.computeBottomRightVertex(halfWidth, halfHeight),
    ];
  }

  public overlaps(transform: Transform2D, shape: Shape2D, shapeTransform: Transform2D) {
    return new CollisionResolver2D_Rectangle(this, transform, shape, shapeTransform).resolveCollision();
  }

  public static isRectangle(shape: Shape2D): shape is Shape2D_Rectangle {
    return shape instanceof Shape2D_Rectangle;
  }
}

export interface RectangleShape2D_Options {
  width?: number;
  height?: number;
}
