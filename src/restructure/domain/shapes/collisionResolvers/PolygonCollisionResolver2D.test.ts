import { PolygonCollisionResolver2D } from './PolygonCollisionResolver2D';
import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { PolygonRectanglePairCollisionResolver2D } from './PolygonRectanglePairCollisionResolver2D';
import { PolygonShape2D } from '../PolygonShape2D';
import { RectangleShape2D } from '../RectangleShape2D';
import { Shape2D } from '../Shape2D';
import { describe, expect, it, vi } from 'vitest';

describe('PolygonCollisionResolver2D', () => {
  it('should use polygon pair collision resolver if both shapes are polygons', () => {
    vi.mock('./PolygonPairCollisionResolver2D');

    const polygon = new PolygonShape2D();
    const shape = new PolygonShape2D();
    const resolver = new PolygonCollisionResolver2D(polygon, shape);

    resolver.resolveCollision();

    expect(PolygonPairCollisionResolver2D).toHaveBeenCalledWith(polygon, shape);
  });

  it('should use polygon-rectangle pair collision resolver if polygon-rectangle pair', () => {
    vi.mock('./PolygonRectanglePairCollisionResolver2D');

    const polygon = new PolygonShape2D();
    const rectangle = new RectangleShape2D();
    const resolver = new PolygonCollisionResolver2D(polygon, rectangle);

    resolver.resolveCollision();

    expect(PolygonRectanglePairCollisionResolver2D).toHaveBeenCalledWith(polygon, rectangle);
  });

  it('should throw if no collision resolver found for shape pair', () => {
    const polygon = new PolygonShape2D();
    const shape = new UnknownShape();
    const resolver = new PolygonCollisionResolver2D(polygon, shape);

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
