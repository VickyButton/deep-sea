import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';
import { Transform2D } from '../../Transform2D';
import { PolygonShape2D } from '../PolygonShape2D';
import { describe, expect, it, vi } from 'vitest';

describe('PolygonPairCollisionResolver2D', () => {
  it('should use Separating Axis Theorem collision resolver', () => {
    vi.mock('./SeparatingAxisTheoremCollisionResolver2D');

    const polygonA = new PolygonShape2D();
    const transformA = new Transform2D();
    const polygonB = new PolygonShape2D();
    const transformB = new Transform2D();
    const collisionResolver = new PolygonPairCollisionResolver2D(polygonA, transformA, polygonB, transformB);

    collisionResolver.resolveCollision();

    expect(SeparatingAxisTheoremCollisionResolver2D).toHaveBeenCalledWith(polygonA.vertices, polygonB.vertices);
  });
});
