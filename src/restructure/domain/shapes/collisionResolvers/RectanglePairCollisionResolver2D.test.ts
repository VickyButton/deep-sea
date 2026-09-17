import { AxisAlignedBoundingBoxCollisionResolver2D } from './AxisAlignedBoundingBoxCollisionResolver2D';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { SeparatingAxisTheoremCollisionResolver2D } from './SeparatingAxisTheoremCollisionResolver2D';
import { RectangleShape2D } from '../RectangleShape2D';
import { describe, expect, it, vi } from 'vitest';

describe('RectanglePairCollisionResolver2D', () => {
  it('should use Axis-Aligned Bounding Box collision resolver if both rectangles are axis-aligned', () => {
    vi.mock('./AxisAlignedBoundingBoxCollisionResolver2D');

    const rectangleA = new RectangleShape2D({
      transform: {
        rotation: 0,
      },
    });
    const rectangleB = new RectangleShape2D({
      transform: {
        rotation: 0,
      },
    });
    const resolver = new RectanglePairCollisionResolver2D(rectangleA, rectangleB);

    resolver.resolveCollision();

    expect(AxisAlignedBoundingBoxCollisionResolver2D).toHaveBeenCalledWith(rectangleA.boundingBox, rectangleB.boundingBox);
  });

  it('should use Separating Axis Theorem collision resolver if either rectangle is not axis-aligned', () => {
    vi.mock('./SeparatingAxisTheoremCollisionResolver2D');

    const rectangleA = new RectangleShape2D();
    const rectangleB = new RectangleShape2D({
      transform: {
        rotation: Math.PI / 4,
      },
    });
    const resolver = new RectanglePairCollisionResolver2D(rectangleA, rectangleB);

    resolver.resolveCollision();

    expect(SeparatingAxisTheoremCollisionResolver2D).toHaveBeenCalledWith(rectangleA.vertices, rectangleB.vertices);
  });
});
