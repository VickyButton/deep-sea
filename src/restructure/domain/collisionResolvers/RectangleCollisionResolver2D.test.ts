import { RectangleCollisionResolver2D } from './RectangleCollisionResolver2D';
import { RectanglePairCollisionResolver2D } from './RectanglePairCollisionResolver2D';
import { RectangleShape2D } from '../shapes/RectangleShape2D';
import { Shape2D } from '../shapes/Shape2D';
import { describe, expect, it, vi } from 'vitest';

describe('RectangleCollisionResolver2D', () => {
  it('should use rectangle pair collision resolver if both shapes are rectangles', () => {
    vi.mock('./RectanglePairCollisionResolver2D');

    const rectangle = new RectangleShape2D();
    const shape = new RectangleShape2D();
    const resolver = new RectangleCollisionResolver2D(rectangle, shape);

    resolver.resolveCollision();

    expect(RectanglePairCollisionResolver2D).toHaveBeenCalledWith(rectangle, shape);
  });

  it('should throw if no collision resolver found for shape pair', () => {
    const rectangle = new RectangleShape2D();
    const shape = new UnknownShape();
    const resolver = new RectangleCollisionResolver2D(rectangle, shape);

    expect(() => resolver.resolveCollision()).toThrowError();
  });
});

class UnknownShape extends Shape2D {
  public boundingBox = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  public isCollidingWith = vi.fn();
  public draw = vi.fn();
}
