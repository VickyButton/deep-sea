import { CollisionResolver2D_PolygonRectanglePair } from './CollisionResolver2D_PolygonRectanglePair';
import { CollisionResolver2D_Rectangle } from './CollisionResolver2D_Rectangle';
import { CollisionResolver2D_RectanglePair } from './CollisionResolver2D_RectanglePair';
import { Transform2D } from '../../transform2D/Transform2D';
import { Shape2D_Mock } from '../Shape2D_Mock';
import { Shape2D_Polygon } from '../Shape2D_Polygon';
import { Shape2D_Rectangle } from '../Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('CollisionResolver2D_Rectangle', () => {
  it('should use rectangle pair collision resolver if both shapes are rectangles', () => {
    vi.mock('./CollisionResolver2D_RectanglePair');

    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const shape = new Shape2D_Rectangle();
    const shapeTransform = new Transform2D();
    const resolver = new CollisionResolver2D_Rectangle(rectangle, rectangleTransform, shape, shapeTransform);

    resolver.resolveCollision();

    expect(CollisionResolver2D_RectanglePair).toHaveBeenCalledWith(rectangle, rectangleTransform, shape, shapeTransform);
  });

  it('should use polygon-rectangle pair collision resolver if polygon-rectangle pair', () => {
    vi.mock('./CollisionResolver2D_PolygonRectanglePair');

    const polygon = new Shape2D_Polygon();
    const polygonTransform = new Transform2D();
    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const resolver = new CollisionResolver2D_Rectangle(rectangle, rectangleTransform, polygon, polygonTransform);

    resolver.resolveCollision();

    expect(CollisionResolver2D_PolygonRectanglePair).toHaveBeenCalledWith(polygon, polygonTransform, rectangle, rectangleTransform);
  });

  it('should throw if no collision resolver found for shape pair', () => {
    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const shape = new Shape2D_Mock();
    const shapeTransform = new Transform2D();
    const resolver = new CollisionResolver2D_Rectangle(rectangle, rectangleTransform, shape, shapeTransform);

    expect(() => resolver.resolveCollision()).toThrowError();
  });
});
