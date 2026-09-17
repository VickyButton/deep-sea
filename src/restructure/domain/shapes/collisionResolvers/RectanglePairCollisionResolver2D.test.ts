import { AxisAlignedBoundingBoxCollisionResolver2D } from './AxisAlignedBoundingBoxCollisionResolver2D';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';
import { Transform2D } from '../../Transform2D';
import { RectangleShape2D } from '../RectangleShape2D';
import { describe, expect, it, vi } from 'vitest';

describe('RectanglePairCollisionResolver2D', () => {
  it('should use Axis-Aligned Bounding Box collision resolver if both rectangles are axis-aligned', () => {
    vi.mock('./AxisAlignedBoundingBoxCollisionResolver2D');

    const rectangleA = new RectangleShape2D();
    const transformA = new Transform2D();
    const rectangleB = new RectangleShape2D();
    const transformB = new Transform2D();
    const resolver = new RectanglePairCollisionResolver2D(rectangleA, transformA, rectangleB, transformB);

    resolver.resolveCollision();

    expect(AxisAlignedBoundingBoxCollisionResolver2D).toHaveBeenCalledWith(rectangleA.boundingBox, rectangleB.boundingBox);
  });

  it('should use Separating Axis Theorem collision resolver if either rectangle is not axis-aligned', () => {
    vi.mock('./SeparatingAxisTheoremCollisionResolver2D');

    const rectangleA = new RectangleShape2D();
    const transformA = new Transform2D();
    const rectangleB = new RectangleShape2D();
    const transformB = new Transform2D({
      rotation: Math.PI / 4,
    });
    const resolver = new RectanglePairCollisionResolver2D(rectangleA, transformA, rectangleB, transformB);

    resolver.resolveCollision();

    expect(SeparatingAxisTheoremCollisionResolver2D).toHaveBeenCalledWith(rectangleA.vertices, rectangleB.vertices);
  });
});
