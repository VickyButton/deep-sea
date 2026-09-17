import type { Transform2D } from '../../Transform2D';
import type { RectangleShape2D } from '../RectangleShape2D';
import { AxisAlignedBoundingBoxCollisionResolver2D } from './AxisAlignedBoundingBoxCollisionResolver2D';
import { CollisionResolver } from './CollisionResolver';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';

/**
 * Used for resolving a collision between two 2D rectangles.
 */
export class RectanglePairCollisionResolver2D extends CollisionResolver {
  private readonly rectangleA: RectangleShape2D;
  private readonly transformA: Transform2D;
  private readonly rectangleB: RectangleShape2D;
  private readonly transformB: Transform2D;

  constructor(rectangleA: RectangleShape2D, transformA: Transform2D, rectangleB: RectangleShape2D, transformB: Transform2D) {
    super();

    this.rectangleA = rectangleA;
    this.transformA = transformA;
    this.rectangleB = rectangleB;
    this.transformB = transformB;
  }

  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver() {
    if (this.bothRectanglesAreAxisAligned()) {
      return this.createAxisAlignedBoundingBoxCollisionResolver();
    }

    return this.createSeparatingAxisTheoremCollisionResolver();
  }

  private bothRectanglesAreAxisAligned() {
    return this.isAxisAligned(this.transformA.rotation) && this.isAxisAligned(this.transformB.rotation);
  }

  private isAxisAligned(rotation: number) {
    return rotation % (Math.PI / 2) === 0;
  }

  private createAxisAlignedBoundingBoxCollisionResolver() {
    const boundingBoxA = this.rectangleA.boundingBox;
    const boundingBoxB = this.rectangleB.boundingBox;

    return new AxisAlignedBoundingBoxCollisionResolver2D(boundingBoxA, boundingBoxB);
  }

  private createSeparatingAxisTheoremCollisionResolver() {
    const verticesA = this.rectangleA.vertices;
    const verticesB = this.rectangleB.vertices;

    return new SeparatingAxisTheoremCollisionResolver2D(verticesA, verticesB);
  }
}
