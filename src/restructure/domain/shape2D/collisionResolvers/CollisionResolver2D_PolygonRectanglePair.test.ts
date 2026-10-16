import { CollisionResolver2D_PolygonRectanglePair } from './CollisionResolver2D_PolygonRectanglePair';
import { CollisionResolver2D_SeparatingAxisTheorem } from './CollisionResolver2D_SeparatingAxisTheorem';
import { Transform2D } from '../../Transform2D';
import { Shape2D_Polygon } from '../Shape2D_Polygon';
import { Shape2D_Rectangle } from '../Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('CollisionResolver2D_PolygonRectanglePair', () => {
  it('should use Separating Axis Theorem collision resolver', () => {
    vi.mock('./CollisionResolver2D_SeparatingAxisTheorem');

    const polygon = new Shape2D_Polygon();
    const polygonTransform = new Transform2D();
    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const collisionResolver = new CollisionResolver2D_PolygonRectanglePair(polygon, polygonTransform, rectangle, rectangleTransform);

    collisionResolver.resolveCollision();

    expect(CollisionResolver2D_SeparatingAxisTheorem).toHaveBeenCalledWith(polygon.vertices, rectangle.vertices);
  });
});
