import { PolygonCollisionResolver2D } from './PolygonCollisionResolver2D';
import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { PolygonShape2D } from '../shapes/PolygonShape2D';
import { Shape2D } from '../shapes/Shape2D';
import { describe, expect, it, vi } from 'vitest';

describe('PolygonCollisionResolver2D', () => {
  it('should use polygon pair collision resolver if both shapes are polygons', () => {
    vi.mock('./PolygonPairCollisionResolver2D');

    const shapeA = new PolygonShape2D();
    const shapeB = new PolygonShape2D();
    const resolver = new PolygonCollisionResolver2D(shapeA, shapeB);

    resolver.resolveCollision();

    expect(PolygonPairCollisionResolver2D).toHaveBeenCalledWith(shapeA, shapeB);
  });

  it('should throw if no collision resolver found for shape pair', () => {
    const shapeA = new PolygonShape2D();
    const shapeB = new UnknownShape();
    const resolver = new PolygonCollisionResolver2D(shapeA, shapeB);

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
