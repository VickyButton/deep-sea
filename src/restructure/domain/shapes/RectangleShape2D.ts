import type { Shape2D_Options } from './Shape2D';
import { RectangleCollisionResolver2D } from './collisionResolvers/RectangleCollisionResolver2D';
import { Shape2D } from './Shape2D';
import { Vector2D } from '../Vector2D';

/**
 * Representation of a 2D rectangle.
 */
export class RectangleShape2D extends Shape2D {
  private _width: number;
  private _halfWidth: number;
  private _height: number;
  private _halfHeight: number;

  constructor(options?: RectangleShape2D_Options) {
    super(options);

    this._width = options?.width ?? 1;
    this._halfWidth = this.computeHalfWidth();
    this._height = options?.height ?? 1;
    this._halfHeight = this.computeHalfHeight();
  }

  private computeHalfWidth() {
    return 0.5 * this._width;
  }

  private computeHalfHeight() {
    return 0.5 * this._height;
  }

  /** The width of the rectangle. */
  public get width() {
    return this._width;
  }

  public set width(width: number) {
    this._width = width;
    this._halfWidth = this.computeHalfWidth();
  }

  /** The half-width of the rectangle. */
  public get halfWidth() {
    return this._halfWidth;
  }

  /** The height of the rectangle. */
  public get height() {
    return this._height;
  }

  public set height(height: number) {
    this._height = height;
    this._halfHeight = this.computeHalfHeight();
  }

  /** The half-height of the rectangle. */
  public get halfHeight() {
    return this._halfHeight;
  }

  /** The width and height of the rectangle. */
  public get size() {
    return new Vector2D(this._width, this._height);
  }

  /** Whether or not the rectangle's edges are parallel to the coordinate axes. */
  public get isAxisAligned() {
    return this.transform.rotation % (Math.PI / 2) === 0;
  }

  /** The vertices of the rectangle, in counterclockwise order. */
  public get vertices() {
    return this.computeVertices();
  }

  private computeVertices() {
    const basisVertices = this.computeBasisVertices();
    const transformMatrix = this.transform.computeTransformationMatrix();

    return basisVertices.map((vertex) => transformMatrix.multiplyVector2D(vertex));
  }

  private computeBasisVertices() {
    return [
      this.computeBasisTopRightVertex(),
      this.computeBasisTopLeftVertex(),
      this.computeBasisBottomLeftVertex(),
      this.computeBasisBottomRightVertex(),
    ];
  }

  private computeBasisTopRightVertex() {
    return new Vector2D(this.halfWidth, this.halfHeight);
  }

  private computeBasisTopLeftVertex() {
    return new Vector2D(-this.halfWidth, this.halfHeight);
  }

  private computeBasisBottomLeftVertex() {
    return new Vector2D(-this.halfWidth, -this.halfHeight);
  }

  private computeBasisBottomRightVertex() {
    return new Vector2D(this.halfWidth, -this.halfHeight);
  }

  public get boundingBox() {
    return this.computeBoundingBox();
  }

  protected computeBoundingBox() {
    const vertices = this.vertices;
    const xValues = vertices.map((vertex) => vertex.x);
    const yValues = vertices.map((vertex) => vertex.y);

    return {
      left: Math.min(...xValues),
      right: Math.max(...xValues),
      top: Math.max(...yValues),
      bottom: Math.min(...yValues),
    };
  }

  public isCollidingWith(shape: Shape2D) {
    return new RectangleCollisionResolver2D(this, shape).resolveCollision();
  }

  public draw() {
    // TODO: Implement.
  }

  public static isRectangle(shape: Shape2D): shape is RectangleShape2D {
    return shape instanceof RectangleShape2D;
  }
}

export interface RectangleShape2D_Options extends Shape2D_Options {
  width?: number;
  height?: number;
}
