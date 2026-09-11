import type { Shape2D, Shape2D_Options } from './Shape2D';
import { RectangleCollisionResolver2D } from '../collisionResolvers/RectangleCollisionResolver2D';
import { Vector2D } from '../Vector2D';
import { PolygonShape2D } from './PolygonShape2D';

/**
 * Representation of a 2D rectangle.
 */
export class RectangleShape2D extends PolygonShape2D {
  /** The width and height of the rectangle. */
  public size: Vector2D;

  constructor(options?: RectangleShape2D_Options) {
    super(options);

    this.size = options?.size ? new Vector2D(options.size[0], options.size[1]) : new Vector2D(1, 1);
  }

  /** The width of the rectangle. */
  public get width() {
    return this.size.x;
  }

  /** The half-width of the rectangle. */
  public get halfWidth() {
    return this.size.x / 2;
  }

  /** The height of the rectangle. */
  public get height() {
    return this.size.y;
  }

  /** The half-height of the rectangle. */
  public get halfHeight() {
    return this.size.y / 2;
  }

  /** Whether or not the rectangle's edges are parallel to the coordinate axes. */
  public get isAxisAligned() {
    return this.transform.rotation % (Math.PI / 2) === 0;
  }

  /** The vertices of the rectangle, in clockwise order. */
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
      this.computeBasisTopLeftVertex(),
      this.computeBasisTopRightVertex(),
      this.computeBasisBottomRightVertex(),
      this.computeBasisBottomLeftVertex(),
    ];
  }

  private computeBasisTopLeftVertex() {
    return new Vector2D(-this.halfWidth, this.halfHeight);
  }

  private computeBasisTopRightVertex() {
    return new Vector2D(this.halfWidth, this.halfHeight);
  }

  private computeBasisBottomRightVertex() {
    return new Vector2D(this.halfWidth, -this.halfHeight);
  }

  private computeBasisBottomLeftVertex() {
    return new Vector2D(-this.halfWidth, -this.halfHeight);
  }

  public isCollidingWith(shape: Shape2D) {
    return this.createCollisionResolver(shape).resolveCollision();
  }

  private createCollisionResolver(shape: Shape2D) {
    return new RectangleCollisionResolver2D(this, shape);
  }

  public draw() {
    // TODO: Implement.
  }
}

export interface RectangleShape2D_Options extends Shape2D_Options {
  size?: [number, number];
}
