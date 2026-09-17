import type { BoundingBox2D } from '../shapes.types';
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
    const sidesA = this.sidesA;
    const sidesB = this.sidesB;

    return (
      !this.isGapBetweenLeftAndRight(sidesA.left, sidesB.right) &&
      !this.isGapBetweenLeftAndRight(sidesB.left, sidesA.right) &&
      !this.isGapBetweenTopAndBottom(sidesA.top, sidesB.bottom) &&
      !this.isGapBetweenTopAndBottom(sidesB.top, sidesA.bottom)
    );
  }

  private get sidesA() {
    return this.getSides(this.boundingBoxA);
  }

  private getSides(boundingBox: BoundingBox2D) {
    const xValues = boundingBox.map((vertex) => vertex.x);
    const yValues = boundingBox.map((vertex) => vertex.y);

    return {
      left: Math.min(...xValues),
      right: Math.max(...xValues),
      top: Math.max(...yValues),
      bottom: Math.min(...yValues),
    };
  }

  private get sidesB() {
    return this.getSides(this.boundingBoxB);
  }

  private isGapBetweenLeftAndRight(left: number, right: number) {
    return left > right;
  }

  private isGapBetweenTopAndBottom(top: number, bottom: number) {
    return top < bottom;
  }
}
