import type { PolygonShape2D } from '../shapes/PolygonShape2D';
import { CollisionResolver } from './CollisionResolver';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';

/**
 * Used for resolving a collision between two 2D polygons.
 */
export class PolygonPairCollisionResolver2D extends CollisionResolver {
  private readonly polygonA: PolygonShape2D;
  private readonly polygonB: PolygonShape2D;

  constructor(polygonA: PolygonShape2D, polygonB: PolygonShape2D) {
    super();

    this.polygonA = polygonA;
    this.polygonB = polygonB;
  }

  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver() {
    return this.createSeparatingAxisTheoremCollisionResolver();
  }

  private createSeparatingAxisTheoremCollisionResolver() {
    const verticesA = this.polygonA.vertices;
    const verticesB = this.polygonB.vertices;

    return new SeparatingAxisTheoremCollisionResolver2D(verticesA, verticesB);
  }
}
