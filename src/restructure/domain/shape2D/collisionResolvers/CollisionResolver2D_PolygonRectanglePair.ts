import type { Transform2D } from '../../Transform2D';
import type { Vector2D } from '../../Vector2D';
import type { Shape2D_Polygon } from '../Shape2D_Polygon';
import type { Shape2D_Rectangle } from '../Shape2D_Rectangle';
import { CollisionResolver2D } from './CollisionResolver2D';
import { CollisionResolver2D_SeparatingAxisTheorem } from './CollisionResolver2D_SeparatingAxisTheorem';

/** Resolves a collision between a 2D polygon and a rectangle. */
export class CollisionResolver2D_PolygonRectanglePair extends CollisionResolver2D {
  private readonly polygon: Shape2D_Polygon;
  private readonly polygonTransform: Transform2D;
  private readonly rectangle: Shape2D_Rectangle;
  private readonly rectangleTransform: Transform2D;

  constructor(polygon: Shape2D_Polygon, polygonTransform: Transform2D, rectangle: Shape2D_Rectangle, rectangleTransform: Transform2D) {
    super();

    this.polygon = polygon;
    this.polygonTransform = polygonTransform;
    this.rectangle = rectangle;
    this.rectangleTransform = rectangleTransform;
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
    return this.transformVertices(this.polygon.vertices, this.polygonTransform);
  }

  private get verticesB() {
    return this.transformVertices(this.rectangle.vertices, this.rectangleTransform);
  }

  private transformVertices(vertices: Vector2D[], transform: Transform2D) {
    const transformMatrix = transform.computeTransformationMatrix();

    return vertices.map((vertex) => transformMatrix.multiplyVector2D(vertex));
  }
}
