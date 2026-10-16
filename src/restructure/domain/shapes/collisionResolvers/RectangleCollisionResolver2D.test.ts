import { PolygonRectanglePairCollisionResolver2D } from './PolygonRectanglePairCollisionResolver2D';
import { RectangleCollisionResolver2D } from './RectangleCollisionResolver2D';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { Transform2D } from '../../Transform2D';
import { Shape2D_Mock } from '../Shape2D_Mock';
import { Shape2D_Polygon } from '../Shape2D_Polygon';
import { Shape2D_Rectangle } from '../Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('RectangleCollisionResolver2D', () => {
  it('should use rectangle pair collision resolver if both shapes are rectangles', () => {
    vi.mock('./RectanglePairCollisionResolver2D');

    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const shape = new Shape2D_Rectangle();
    const shapeTransform = new Transform2D();
    const resolver = new RectangleCollisionResolver2D(rectangle, rectangleTransform, shape, shapeTransform);

    resolver.resolveCollision();

    expect(RectanglePairCollisionResolver2D).toHaveBeenCalledWith(rectangle, rectangleTransform, shape, shapeTransform);
  });

  it('should use polygon-rectangle pair collision resolver if polygon-rectangle pair', () => {
    vi.mock('./PolygonRectanglePairCollisionResolver2D');

    const polygon = new Shape2D_Polygon();
    const polygonTransform = new Transform2D();
    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const resolver = new RectangleCollisionResolver2D(rectangle, rectangleTransform, polygon, polygonTransform);

    resolver.resolveCollision();

    expect(PolygonRectanglePairCollisionResolver2D).toHaveBeenCalledWith(polygon, polygonTransform, rectangle, rectangleTransform);
  });

  it('should throw if no collision resolver found for shape pair', () => {
    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const shape = new Shape2D_Mock();
    const shapeTransform = new Transform2D();
    const resolver = new RectangleCollisionResolver2D(rectangle, rectangleTransform, shape, shapeTransform);

    expect(() => resolver.resolveCollision()).toThrowError();
  });
});
