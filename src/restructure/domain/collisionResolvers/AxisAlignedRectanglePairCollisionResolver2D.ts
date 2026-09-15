import type { RectangleShape2D } from '../shapes/RectangleShape2D';
import { CollisionResolver2D } from './CollisionResolver2D';

export class AxisAlignedRectanglePairCollisionResolver2D extends CollisionResolver2D<RectangleShape2D, RectangleShape2D> {
  public resolveCollision() {
    this.throwIfNotAxisAligned();
    return this.isNoGapBetweenRectangles();
  }

  private throwIfNotAxisAligned() {
    if (!this.shapeA.isAxisAligned || !this.shapeB.isAxisAligned) {
      throw new Error('At least one passed rectangle is not axis-aligned.');
    }
  }

  private isNoGapBetweenRectangles() {
    const sidesA = this.shapeA.boundingRectangle;
    const sidesB = this.shapeB.boundingRectangle;

    return !this.isGapBetweenLeftAndRight(sidesA.left, sidesB.right) && !this.isGapBetweenLeftAndRight(sidesB.left, sidesA.right) && !this.isGapBetweenTopAndBottom(sidesA.top, sidesB.bottom) && !this.isGapBetweenTopAndBottom(sidesB.top, sidesA.bottom);
  }

  private isGapBetweenLeftAndRight(left: number, right: number) {
    return left > right;
  }

  private isGapBetweenTopAndBottom(top: number, bottom: number) {
    return top < bottom;
  }
}
