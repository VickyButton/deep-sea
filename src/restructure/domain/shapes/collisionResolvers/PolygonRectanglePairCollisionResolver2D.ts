import type { Transform2D } from '../../Transform2D';
import type { Vector2D } from '../../Vector2D';
import type { PolygonShape2D } from '../PolygonShape2D';
import type { RectangleShape2D } from '../RectangleShape2D';
import { CollisionResolver } from './CollisionResolver';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';

export class PolygonRectanglePairCollisionResolver2D extends CollisionResolver {
  private readonly polygon: PolygonShape2D;
  private readonly polygonTransform: Transform2D;
  private readonly rectangle: RectangleShape2D;
  private readonly rectangleTransform: Transform2D;

  constructor(polygon: PolygonShape2D, polygonTransform: Transform2D, rectangle: RectangleShape2D, rectangleTransform: Transform2D) {
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

    return new SeparatingAxisTheoremCollisionResolver2D(verticesA, verticesB);
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
