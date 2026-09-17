import type { Shape2D } from '../shapes/Shape2D';
import { CollisionResolver } from './CollisionResolver';
import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { PolygonShape2D } from '../shapes/PolygonShape2D';

/**
 * Used to resolve a collision between a 2D polygon and an unknown 2D shape.
 */
export class PolygonCollisionResolver2D extends CollisionResolver {
  private readonly polygon: PolygonShape2D;
  private readonly shape: Shape2D;

  constructor(polygon: PolygonShape2D, shape: Shape2D) {
    super();

    this.polygon = polygon;
    this.shape = shape;
  }

  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver(): CollisionResolver {
    if (PolygonShape2D.isPolygon(this.shape)) {
      return this.createPolygonPairCollisionResolver(this.polygon, this.shape);
    }

    throw this.createUnableToResolveCollisionError();
  }

  private createPolygonPairCollisionResolver(polygonA: PolygonShape2D, polygonB: PolygonShape2D) {
    return new PolygonPairCollisionResolver2D(polygonA, polygonB);
  }
}
