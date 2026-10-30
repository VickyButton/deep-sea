import { CollisionResolver2D_Polygon } from './CollisionResolver2D_Polygon';
import { CollisionResolver2D_PolygonPair } from './CollisionResolver2D_PolygonPair';
import { CollisionResolver2D_PolygonRectanglePair } from './CollisionResolver2D_PolygonRectanglePair';
import { Transform2D } from '../../transform2D/Transform2D';
import { Shape2D_Mock } from '../Shape2D_Mock';
import { Shape2D_Polygon } from '../Shape2D_Polygon';
import { Shape2D_Rectangle } from '../Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('CollisionResolver2D_Polygon', () => {
  it('should use polygon pair collision resolver if both shapes are polygons', () => {
    vi.mock('./CollisionResolver2D_PolygonPair');

    const polygonA = new Shape2D_Polygon();
    const transformA = new Transform2D();
    const polygonB = new Shape2D_Polygon();
    const transformB = new Transform2D();
    const resolver = new CollisionResolver2D_Polygon(polygonA, transformA, polygonB, transformB);

    resolver.resolveCollision();

    expect(CollisionResolver2D_PolygonPair).toHaveBeenCalledWith(polygonA, transformA, polygonB, transformB);
  });

  it('should use polygon-rectangle pair collision resolver if polygon-rectangle pair', () => {
    vi.mock('./CollisionResolver2D_PolygonRectanglePair');

    const polygon = new Shape2D_Polygon();
    const polygonTransform = new Transform2D();
    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const resolver = new CollisionResolver2D_Polygon(polygon, polygonTransform, rectangle, rectangleTransform);

    resolver.resolveCollision();

    expect(CollisionResolver2D_PolygonRectanglePair).toHaveBeenCalledWith(polygon, polygonTransform, rectangle, rectangleTransform);
  });

  it('should throw if no collision resolver found for shape pair', () => {
    const polygon = new Shape2D_Polygon();
    const polygonTransform = new Transform2D();
    const shape = new Shape2D_Mock();
    const shapeTransform = new Transform2D();
    const resolver = new CollisionResolver2D_Polygon(polygon, polygonTransform, shape, shapeTransform);

    expect(() => resolver.resolveCollision()).toThrowError();
  });
});
