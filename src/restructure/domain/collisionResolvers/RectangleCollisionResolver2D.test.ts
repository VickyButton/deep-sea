import { RectangleCollisionResolver2D } from './RectangleCollisionResolver2D';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { RectangleShape2D } from '../shapes/RectangleShape2D';
import { Shape2D } from '../shapes/Shape2D';
import { describe, expect, it, vi } from 'vitest';

describe('RectangleCollisionResolver2D', () => {
  it('should use rectangle pair collision resolver if both shapes are rectangles', () => {
    vi.mock('./RectanglePairCollisionResolver2D');

    const shapeA = new RectangleShape2D();
    const shapeB = new RectangleShape2D();
    const resolver = new RectangleCollisionResolver2D(shapeA, shapeB);

    resolver.resolveCollision();

    expect(RectanglePairCollisionResolver2D).toHaveBeenCalledWith(shapeA, shapeB);
  });

  it('should throw if no collision resolver found for shape pair', () => {
    const shapeA = new RectangleShape2D();
    const shapeB = new UnknownShape();
    const resolver = new RectangleCollisionResolver2D(shapeA, shapeB);

    expect(() => resolver.resolveCollision()).toThrowError();
  });
});

class UnknownShape extends Shape2D {
  public boundingRectangle = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  public isCollidingWith = vi.fn();
  public draw = vi.fn();
}
