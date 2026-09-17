import { PolygonRectanglePairCollisionResolver2D } from './PolygonRectanglePairCollisionResolver2D';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';
import { PolygonShape2D } from '../shapes/PolygonShape2D';
import { RectangleShape2D } from '../shapes/RectangleShape2D';
import { describe, expect, it, vi } from 'vitest';

describe('PolygonRectanglePairCollisionResolver2D', () => {
  it('should use Separating Axis Theorem collision resolver', () => {
    vi.mock('./SeparatingAxisTheoremCollisionResolver2D');

    const polygon = new PolygonShape2D();
    const rectangle = new RectangleShape2D();
    const collisionResolver = new PolygonRectanglePairCollisionResolver2D(polygon, rectangle);

    collisionResolver.resolveCollision();

    expect(SeparatingAxisTheoremCollisionResolver2D).toHaveBeenCalledWith(polygon.vertices, rectangle.vertices);
  });
});
