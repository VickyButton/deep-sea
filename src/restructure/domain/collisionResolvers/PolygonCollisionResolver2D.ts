import type { Shape2D } from '../shapes/Shape2D';
import { CollisionResolver2D } from './CollisionResolver2D';
import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { PolygonShape2D } from '../shapes/PolygonShape2D';

export class PolygonCollisionResolver2D extends CollisionResolver2D<PolygonShape2D, Shape2D> {
  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver(): CollisionResolver2D {
    if (this.isPolygon(this.shapeB)) {
      return new PolygonPairCollisionResolver2D(this.shapeA, this.shapeB);
    }

    throw new Error('No collision resolver available for shape pair.');
  }

  private isPolygon(shape: Shape2D): shape is PolygonShape2D {
    return shape instanceof PolygonShape2D;
  }
}
