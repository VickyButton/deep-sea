import type { Transform2D } from '../../Transform2D';
import type { Shape2D } from '../shape2D.types';
import { CollisionResolver2D } from './CollisionResolver2D';
import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { PolygonRectanglePairCollisionResolver2D } from './PolygonRectanglePairCollisionResolver2D';
import { Shape2D_Polygon } from '../Shape2D_Polygon';
import { Shape2D_Rectangle } from '../Shape2D_Rectangle';

/** Resolves a collision between a 2D polygon and an unknown 2D shape. */
export class PolygonCollisionResolver2D extends CollisionResolver2D {
  private readonly polygon: Shape2D_Polygon;
  private readonly polygonTransform: Transform2D;
  private readonly shape: Shape2D;
  private readonly shapeTransform: Transform2D;

  constructor(polygon: Shape2D_Polygon, polygonTransform: Transform2D, shape: Shape2D, shapeTransform: Transform2D) {
    super();

    this.polygon = polygon;
    this.polygonTransform = polygonTransform;
    this.shape = shape;
    this.shapeTransform = shapeTransform;
  }

  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver(): CollisionResolver2D {
    if (Shape2D_Polygon.isPolygon(this.shape)) {
      return this.createPolygonPairCollisionResolver(this.polygon, this.polygonTransform, this.shape, this.shapeTransform);
    } else if (Shape2D_Rectangle.isRectangle(this.shape)) {
      return this.createPolygonRectanglePairCollisionResolver(this.polygon, this.polygonTransform, this.shape, this.shapeTransform);
    }

    throw this.createUnableToResolveCollisionError();
  }

  private createPolygonPairCollisionResolver(polygonA: Shape2D_Polygon, transformA: Transform2D, polygonB: Shape2D_Polygon, transformB: Transform2D) {
    return new PolygonPairCollisionResolver2D(polygonA, transformA, polygonB, transformB);
  }

  private createPolygonRectanglePairCollisionResolver(polygon: Shape2D_Polygon, polygonTransform: Transform2D, rectangle: Shape2D_Rectangle, rectangleTransform: Transform2D) {
    return new PolygonRectanglePairCollisionResolver2D(polygon, polygonTransform, rectangle, rectangleTransform);
  }
}
