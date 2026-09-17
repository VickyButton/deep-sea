import type { Transform2D } from '../../Transform2D';
import type { Shape2D } from '../Shape2D';
import { CollisionResolver } from './CollisionResolver';
import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { PolygonRectanglePairCollisionResolver2D } from './PolygonRectanglePairCollisionResolver2D';
import { PolygonShape2D } from '../PolygonShape2D';
import { RectangleShape2D } from '../RectangleShape2D';

/**
 * Used to resolve a collision between a 2D polygon and an unknown 2D shape.
 */
export class PolygonCollisionResolver2D extends CollisionResolver {
  private readonly polygon: PolygonShape2D;
  private readonly polygonTransform: Transform2D;
  private readonly shape: Shape2D;
  private readonly shapeTransform: Transform2D;

  constructor(polygon: PolygonShape2D, polygonTransform: Transform2D, shape: Shape2D, shapeTransform: Transform2D) {
    super();

    this.polygon = polygon;
    this.polygonTransform = polygonTransform;
    this.shape = shape;
    this.shapeTransform = shapeTransform;
  }

  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver(): CollisionResolver {
    if (PolygonShape2D.isPolygon(this.shape)) {
      return this.createPolygonPairCollisionResolver(this.polygon, this.polygonTransform, this.shape, this.shapeTransform);
    } else if (RectangleShape2D.isRectangle(this.shape)) {
      return this.createPolygonRectanglePairCollisionResolver(this.polygon, this.polygonTransform, this.shape, this.shapeTransform);
    }

    throw this.createUnableToResolveCollisionError();
  }

  private createPolygonPairCollisionResolver(polygonA: PolygonShape2D, transformA: Transform2D, polygonB: PolygonShape2D, transformB: Transform2D) {
    return new PolygonPairCollisionResolver2D(polygonA, transformA, polygonB, transformB);
  }

  private createPolygonRectanglePairCollisionResolver(polygon: PolygonShape2D, polygonTransform: Transform2D, rectangle: RectangleShape2D, rectangleTransform: Transform2D) {
    return new PolygonRectanglePairCollisionResolver2D(polygon, polygonTransform, rectangle, rectangleTransform);
  }
}
