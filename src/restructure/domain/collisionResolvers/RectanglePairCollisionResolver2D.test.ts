import { AxisAlignedRectanglePairCollisionResolver2D } from './AxisAlignedRectanglePairCollisionResolver2D';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { RectangleShape2D } from '../shapes/RectangleShape2D';
import { describe, expect, it, vi } from 'vitest';

describe('RectanglePairCollisionResolver2D', () => {
  it('should use axis-aligned rectangle pair collision resolver if both rectangles are axis-aligned', () => {
    vi.mock('./AxisAlignedRectanglePairCollisionResolver2D');

    const shapeA = new RectangleShape2D({
      transform: {
        rotation: 0,
      },
    });
    const shapeB = new RectangleShape2D({
      transform: {
        rotation: 0,
      },
    });
    const resolver = new RectanglePairCollisionResolver2D(shapeA, shapeB);

    resolver.resolveCollision();

    expect(AxisAlignedRectanglePairCollisionResolver2D).toHaveBeenCalledWith(shapeA, shapeB);
  });

  it('should throw if no collision resolver found for rectangle pair', () => {
    const shapeA = new RectangleShape2D();
    const shapeB = new RectangleShape2D({
      transform: {
        rotation: Math.PI / 4,
      },
    });
    const resolver = new RectanglePairCollisionResolver2D(shapeA, shapeB);

    expect(() => resolver.resolveCollision()).toThrowError();
  });
});
