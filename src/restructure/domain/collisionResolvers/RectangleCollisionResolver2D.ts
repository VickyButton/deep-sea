import type { Shape2D } from '../shapes/Shape2D';
import { CollisionResolver2D } from './CollisionResolver2D';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { RectangleShape2D } from '../shapes/RectangleShape2D';

export class RectangleCollisionResolver2D extends CollisionResolver2D<RectangleShape2D, Shape2D> {
  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver(): CollisionResolver2D {
    if (this.isRectangle(this.shapeB)) {
      return new RectanglePairCollisionResolver2D(this.shapeA, this.shapeB);
    }

    throw new Error('No collision resolver available for shape pair.');
  }

  private isRectangle(shape: Shape2D): shape is RectangleShape2D {
    return shape instanceof RectangleShape2D;
  }
}
