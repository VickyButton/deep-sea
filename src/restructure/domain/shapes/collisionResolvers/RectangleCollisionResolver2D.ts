import type { Shape2D } from '../Shape2D';
import { CollisionResolver } from './CollisionResolver';
import { PolygonRectanglePairCollisionResolver2D } from './PolygonRectanglePairCollisionResolver2D';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { PolygonShape2D } from '../PolygonShape2D';
import { RectangleShape2D } from '../RectangleShape2D';

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
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver(): CollisionResolver {
    if (RectangleShape2D.isRectangle(this.shape)) {
      return this.createRectanglePairCollisionResolver(this.rectangle, this.shape);
    } else if (PolygonShape2D.isPolygon(this.shape)) {
      return this.createPolygonRectanglePairCollisionResolver(this.shape, this.rectangle);
    }

    throw this.createUnableToResolveCollisionError();
  }

  private createRectanglePairCollisionResolver(rectangleA: RectangleShape2D, rectangleB: RectangleShape2D) {
    return new RectanglePairCollisionResolver2D(rectangleA, rectangleB);
  }

  private createPolygonRectanglePairCollisionResolver(polygon: PolygonShape2D, rectangle: RectangleShape2D) {
    return new PolygonRectanglePairCollisionResolver2D(polygon, rectangle);
  }
}
