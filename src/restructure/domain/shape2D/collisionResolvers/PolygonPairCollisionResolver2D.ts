import type { Transform2D } from '../../Transform2D';
import type { Vector2D } from '../../Vector2D';
import type { Shape2D_Polygon } from '../Shape2D_Polygon';
import { CollisionResolver2D } from './CollisionResolver2D';
import { CollisionResolver2D_SeparatingAxisTheorem } from './CollisionResolver2D_SeparatingAxisTheorem';

/** Resolves a collision between two 2D polygons. */
export class PolygonPairCollisionResolver2D extends CollisionResolver2D {
  private readonly polygonA: Shape2D_Polygon;
  private readonly transformA: Transform2D;
  private readonly polygonB: Shape2D_Polygon;
  private readonly transformB: Transform2D;

  constructor(polygonA: Shape2D_Polygon, transformA: Transform2D, polygonB: Shape2D_Polygon, transformB: Transform2D) {
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

    return new CollisionResolver2D_SeparatingAxisTheorem(verticesA, verticesB);
  }

  private get verticesA() {
    return this.transformVertices(this.polygonA.vertices, this.transformA);
  }

  private get verticesB() {
    return this.transformVertices(this.polygonB.vertices, this.transformB);
  }

  private transformVertices(vertices: Vector2D[], transform: Transform2D) {
    const transformMatrix = transform.computeTransformationMatrix();

    return vertices.map((vertex) => transformMatrix.multiplyVector2D(vertex));
  }
}
