import type { Transform2D } from '../../transform2D/Transform2D';
import type { Shape2D } from '../shape2D.types';
import { CollisionResolver2D } from './CollisionResolver2D';
import { CollisionResolver2D_PolygonRectanglePair } from './CollisionResolver2D_PolygonRectanglePair';
import { CollisionResolver2D_RectanglePair } from './CollisionResolver2D_RectanglePair';
import { Shape2D_Polygon } from '../Shape2D_Polygon';
import { Shape2D_Rectangle } from '../Shape2D_Rectangle';

/** Resolves a collision between a rectangle and an unknown 2D shape. */
export class CollisionResolver2D_Rectangle extends CollisionResolver2D {
  private readonly rectangle: Shape2D_Rectangle;
  private readonly rectangleTransform: Transform2D;
  private readonly shape: Shape2D;
  private readonly shapeTransform: Transform2D;

  constructor(rectangle: Shape2D_Rectangle, rectangleTransform: Transform2D, shape: Shape2D, shapeTransform: Transform2D) {
    super();

    this.rectangle = rectangle;
    this.rectangleTransform = rectangleTransform;
    this.shape = shape;
    this.shapeTransform = shapeTransform;
  }

  public resolveCollision() {
    return this.getCollisionResolver().resolveCollision();
  }

  private getCollisionResolver(): CollisionResolver2D {
    if (Shape2D_Rectangle.isRectangle(this.shape)) {
      return this.createRectanglePairCollisionResolver(this.rectangle, this.rectangleTransform, this.shape, this.shapeTransform);
    } else if (Shape2D_Polygon.isPolygon(this.shape)) {
      return this.createPolygonRectanglePairCollisionResolver(this.shape, this.shapeTransform, this.rectangle, this.rectangleTransform);
    }

    throw this.createUnableToResolveCollisionError();
  }

  private createRectanglePairCollisionResolver(rectangleA: Shape2D_Rectangle, transformA: Transform2D, rectangleB: Shape2D_Rectangle, transformB: Transform2D) {
    return new CollisionResolver2D_RectanglePair(rectangleA, transformA, rectangleB, transformB);
  }

  private createPolygonRectanglePairCollisionResolver(polygon: Shape2D_Polygon, polygonTransform: Transform2D, rectangle: Shape2D_Rectangle, rectangleTransform: Transform2D) {
    return new CollisionResolver2D_PolygonRectanglePair(polygon, polygonTransform, rectangle, rectangleTransform);
  }
}
