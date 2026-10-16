import { AxisAlignedBoundingBoxCollisionResolver2D } from './AxisAlignedBoundingBoxCollisionResolver2D';
import { CollisionResolver2D_SeparatingAxisTheorem } from './CollisionResolver2D_SeparatingAxisTheorem';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { Transform2D } from '../../Transform2D';
import { Shape2D_Rectangle } from '../Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('RectanglePairCollisionResolver2D', () => {
  it('should use Axis-Aligned Bounding Box collision resolver if both rectangles are axis-aligned', () => {
    vi.mock('./AxisAlignedBoundingBoxCollisionResolver2D');

    const rectangleA = new Shape2D_Rectangle();
    const transformA = new Transform2D();
    const rectangleB = new Shape2D_Rectangle();
    const transformB = new Transform2D();
    const resolver = new RectanglePairCollisionResolver2D(rectangleA, transformA, rectangleB, transformB);

    resolver.resolveCollision();

    expect(AxisAlignedBoundingBoxCollisionResolver2D).toHaveBeenCalledWith(rectangleA.boundingBox, rectangleB.boundingBox);
  });

  it('should use Separating Axis Theorem collision resolver if either rectangle is not axis-aligned', () => {
    vi.mock('./CollisionResolver2D_SeparatingAxisTheorem');

    const rectangleA = new Shape2D_Rectangle();
    const transformA = new Transform2D();
    const rectangleB = new Shape2D_Rectangle();
    const transformB = new Transform2D({
      rotation: Math.PI / 4,
    });
    const resolver = new RectanglePairCollisionResolver2D(rectangleA, transformA, rectangleB, transformB);

    resolver.resolveCollision();

    expect(CollisionResolver2D_SeparatingAxisTheorem).toHaveBeenCalledWith(rectangleA.vertices, rectangleB.vertices);
  });
});
