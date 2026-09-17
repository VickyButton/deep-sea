import type { PolygonShape2D } from '../shapes/PolygonShape2D';
import type { RectangleShape2D } from '../shapes/RectangleShape2D';
import { CollisionResolver } from './CollisionResolver';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';

export class PolygonRectanglePairCollisionResolver2D extends CollisionResolver {
  private readonly polygon: PolygonShape2D;
  private readonly rectangle: RectangleShape2D;

  constructor(polygon: PolygonShape2D, rectangle: RectangleShape2D) {
    super();

    this.polygon = polygon;
    this.rectangle = rectangle;
  }

  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver() {
    return this.createSeparatingAxisTheoremCollisionResolver();
  }

  private createSeparatingAxisTheoremCollisionResolver() {
    const verticesA = this.polygon.vertices;
    const verticesB = this.rectangle.vertices;

    return new SeparatingAxisTheoremCollisionResolver2D(verticesA, verticesB);
  }
}
