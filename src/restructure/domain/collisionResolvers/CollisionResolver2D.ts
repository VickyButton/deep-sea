import type { Shape2D } from '../shapes/Shape2D';

/**
 * Handles collision resolution between a base shape and a target shape.
 */
export abstract class CollisionResolver2D<A extends Shape2D = Shape2D, B extends Shape2D = Shape2D> {
  protected readonly shapeA: A;
  protected readonly shapeB: B;

  constructor(shapeA: A, shapeB: B) {
    this.shapeA = shapeA;
    this.shapeB = shapeB;
  }

  /**
   * Resolves a collision between the shapes.
   * @returns True if the shapes are colliding, false if not.
   */
  public abstract resolveCollision(): boolean;
}
