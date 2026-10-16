import type { Transform2D } from '../../Transform2D';
import type { Shape2D_Rectangle } from '../Shape2D_Rectangle';
import { AxisAlignedBoundingBoxCollisionResolver2D } from './AxisAlignedBoundingBoxCollisionResolver2D';
import { CollisionResolver2D } from './CollisionResolver2D';
import { CollisionResolver2D_SeparatingAxisTheorem } from './CollisionResolver2D_SeparatingAxisTheorem';

/** Resolves a collision between two rectangles. */
export class RectanglePairCollisionResolver2D extends CollisionResolver2D {
  private readonly rectangleA: Shape2D_Rectangle;
  private readonly transformA: Transform2D;
  private readonly rectangleB: Shape2D_Rectangle;
  private readonly transformB: Transform2D;

  constructor(rectangleA: Shape2D_Rectangle, transformA: Transform2D, rectangleB: Shape2D_Rectangle, transformB: Transform2D) {
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
    // TODO: Apply transformation matrix to bounding boxes.
    const boundingBoxA = this.rectangleA.boundingBox;
    const boundingBoxB = this.rectangleB.boundingBox;

    return new AxisAlignedBoundingBoxCollisionResolver2D(boundingBoxA, boundingBoxB);
  }

  private createSeparatingAxisTheoremCollisionResolver() {
    // TODO: Apply transformation matrix to vertices.
    const verticesA = this.rectangleA.vertices;
    const verticesB = this.rectangleB.vertices;

    return new CollisionResolver2D_SeparatingAxisTheorem(verticesA, verticesB);
  }
}
