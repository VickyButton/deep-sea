import type { BoundingBox2D } from '../shapes/shapes.types';
import { CollisionResolver } from './CollisionResolver';

/**
 * Used for resolving a collision between two 2D axis-aligned bounding boxes.
 */
export class AxisAlignedBoundingBoxCollisionResolver2D extends CollisionResolver {
  private readonly boundingBoxA: BoundingBox2D;
  private readonly boundingBoxB: BoundingBox2D;

  constructor(boundingBoxA: BoundingBox2D, boundingBoxB: BoundingBox2D) {
    super();

    this.boundingBoxA = boundingBoxA;
    this.boundingBoxB = boundingBoxB;
  }

  public resolveCollision() {
    return this.isNoGapBetweenBoxes();
  }

  private isNoGapBetweenBoxes() {
    const sidesA = this.boundingBoxA;
    const sidesB = this.boundingBoxB;

    return (
      !this.isGapBetweenLeftAndRight(sidesA.left, sidesB.right) &&
      !this.isGapBetweenLeftAndRight(sidesB.left, sidesA.right) &&
      !this.isGapBetweenTopAndBottom(sidesA.top, sidesB.bottom) &&
      !this.isGapBetweenTopAndBottom(sidesB.top, sidesA.bottom)
    );
  }

  private isGapBetweenLeftAndRight(left: number, right: number) {
    return left > right;
  }

  private isGapBetweenTopAndBottom(top: number, bottom: number) {
    return top < bottom;
  }
}
