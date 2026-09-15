import type { RectangleShape2D } from '../shapes/RectangleShape2D';
import { AxisAlignedRectanglePairCollisionResolver2D } from './AxisAlignedRectanglePairCollisionResolver2D';
import { CollisionResolver2D } from './CollisionResolver2D';

export class RectanglePairCollisionResolver2D extends CollisionResolver2D<RectangleShape2D, RectangleShape2D> {
  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver(): CollisionResolver2D {
    if (this.bothShapesAreAxisAligned()) {
      return new AxisAlignedRectanglePairCollisionResolver2D(this.shapeA, this.shapeB);
    }

    throw new Error('No collision resolver available for shape pair.');
  }

  private bothShapesAreAxisAligned() {
    return this.shapeA.isAxisAligned && this.shapeB.isAxisAligned;
  }
}
