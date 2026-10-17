import { CollisionResolver2D_PolygonPair } from './CollisionResolver2D_PolygonPair';
import { CollisionResolver2D_SeparatingAxisTheorem } from './CollisionResolver2D_SeparatingAxisTheorem';
import { Transform2D } from '../../transform2D/Transform2D';
import { Shape2D_Polygon } from '../Shape2D_Polygon';
import { describe, expect, it, vi } from 'vitest';

describe('CollisionResolver2D_PolygonPair', () => {
  it('should use Separating Axis Theorem collision resolver', () => {
    vi.mock('./CollisionResolver2D_SeparatingAxisTheorem');

    const polygonA = new Shape2D_Polygon();
    const transformA = new Transform2D();
    const polygonB = new Shape2D_Polygon();
    const transformB = new Transform2D();
    const collisionResolver = new CollisionResolver2D_PolygonPair(polygonA, transformA, polygonB, transformB);

    collisionResolver.resolveCollision();

    expect(CollisionResolver2D_SeparatingAxisTheorem).toHaveBeenCalledWith(polygonA.vertices, polygonB.vertices);
  });
});
