import type { Transform2D } from '../../Transform2D';
import type { Vector2D } from '../../Vector2D';
import type { PolygonShape2D } from '../PolygonShape2D';
import { CollisionResolver } from './CollisionResolver';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';

/**
 * Used for resolving a collision between two 2D polygons.
 */
export class PolygonPairCollisionResolver2D extends CollisionResolver {
  private readonly polygonA: PolygonShape2D;
  private readonly transformA: Transform2D;
  private readonly polygonB: PolygonShape2D;
  private readonly transformB: Transform2D;

  constructor(polygonA: PolygonShape2D, transformA: Transform2D, polygonB: PolygonShape2D, transformB: Transform2D) {
    super();

    this.polygonA = polygonA;
    this.transformA = transformA;
    this.polygonB = polygonB;
    this.transformB = transformB;
  }

  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver() {
    return this.createSeparatingAxisTheoremCollisionResolver();
  }

  private createSeparatingAxisTheoremCollisionResolver() {
    const verticesA = this.verticesA;
    const verticesB = this.verticesB;

    return new SeparatingAxisTheoremCollisionResolver2D(verticesA, verticesB);
  }

  private get verticesA() {
    return this.transformVertices(this.polygonA.vertices, this.transformA);
  }

  private transformVertices(vertices: Vector2D[], transform: Transform2D) {
    const transformMatrix = transform.computeTransformationMatrix();

    return vertices.map((vertex) => transformMatrix.multiplyVector2D(vertex));
  }

  private get verticesB() {
    return this.transformVertices(this.polygonB.vertices, this.transformB);
  }
}
