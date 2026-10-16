import { PolygonRectanglePairCollisionResolver2D } from './PolygonRectanglePairCollisionResolver2D';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';
import { Transform2D } from '../../Transform2D';
import { Shape2D_Polygon } from '../Shape2D_Polygon';
import { Shape2D_Rectangle } from '../Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('PolygonRectanglePairCollisionResolver2D', () => {
  it('should use Separating Axis Theorem collision resolver', () => {
    vi.mock('./SeparatingAxisTheoremCollisionResolver2D');

    const polygon = new Shape2D_Polygon();
    const polygonTransform = new Transform2D();
    const rectangle = new Shape2D_Rectangle();
    const rectangleTransform = new Transform2D();
    const collisionResolver = new PolygonRectanglePairCollisionResolver2D(polygon, polygonTransform, rectangle, rectangleTransform);

    collisionResolver.resolveCollision();

    expect(SeparatingAxisTheoremCollisionResolver2D).toHaveBeenCalledWith(polygon.vertices, rectangle.vertices);
  });
});
