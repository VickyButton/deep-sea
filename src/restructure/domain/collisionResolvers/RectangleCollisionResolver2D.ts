import type { Shape2D } from '../shapes/Shape2D';
import { CollisionResolver } from './CollisionResolver';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { RectangleShape2D } from '../shapes/RectangleShape2D';

/**
 * Used for resolving a collision between a 2D rectangle and an unknown 2D shape.
 */
export class RectangleCollisionResolver2D extends CollisionResolver {
  private readonly rectangle: RectangleShape2D;
  private readonly shape: Shape2D;

  constructor(rectangle: RectangleShape2D, shape: Shape2D) {
    super();

    this.rectangle = rectangle;
    this.shape = shape;
  }

  public resolveCollision() {
    return this.getCollisionResolver(this.rectangle, this.shape).resolveCollision();
  }

  private getCollisionResolver(rectangle: RectangleShape2D, shape: Shape2D) {
    if (this.isRectangle(shape)) {
      return this.createRectanglePairCollisionResolver(rectangle, shape);
    }

    throw this.createUnableToResolveCollisionError();
  }

  private isRectangle(shape: Shape2D): shape is RectangleShape2D {
    return shape instanceof RectangleShape2D;
  }

  private createRectanglePairCollisionResolver(rectangleA: RectangleShape2D, rectangleB: RectangleShape2D) {
    return new RectanglePairCollisionResolver2D(rectangleA, rectangleB);
  }
}
