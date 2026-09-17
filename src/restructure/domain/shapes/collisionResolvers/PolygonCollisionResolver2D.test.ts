import type { BoundingBox2D } from '../shapes.types';
import { PolygonCollisionResolver2D } from './PolygonCollisionResolver2D';
import { PolygonPairCollisionResolver2D } from './PolygonPairCollisionResolver2D';
import { PolygonRectanglePairCollisionResolver2D } from './PolygonRectanglePairCollisionResolver2D';
import { Transform2D } from '../../Transform2D';
import { Vector2D } from '../../Vector2D';
import { PolygonShape2D } from '../PolygonShape2D';
import { RectangleShape2D } from '../RectangleShape2D';
import { Shape2D } from '../Shape2D';
import { describe, expect, it, vi } from 'vitest';

describe('PolygonCollisionResolver2D', () => {
  it('should use polygon pair collision resolver if both shapes are polygons', () => {
    vi.mock('./PolygonPairCollisionResolver2D');

    const polygonA = new PolygonShape2D();
    const transformA = new Transform2D();
    const polygonB = new PolygonShape2D();
    const transformB = new Transform2D();
    const resolver = new PolygonCollisionResolver2D(polygonA, transformA, polygonB, transformB);

    resolver.resolveCollision();

    expect(PolygonPairCollisionResolver2D).toHaveBeenCalledWith(polygonA, transformA, polygonB, transformB);
  });

  it('should use polygon-rectangle pair collision resolver if polygon-rectangle pair', () => {
    vi.mock('./PolygonRectanglePairCollisionResolver2D');

    const polygon = new PolygonShape2D();
    const polygonTransform = new Transform2D();
    const rectangle = new RectangleShape2D();
    const rectangleTransform = new Transform2D();
    const resolver = new PolygonCollisionResolver2D(polygon, polygonTransform, rectangle, rectangleTransform);

    resolver.resolveCollision();

    expect(PolygonRectanglePairCollisionResolver2D).toHaveBeenCalledWith(polygon, polygonTransform, rectangle, rectangleTransform);
  });

  it('should throw if no collision resolver found for shape pair', () => {
    const polygon = new PolygonShape2D();
    const polygonTransform = new Transform2D();
    const shape = new UnknownShape();
    const shapeTransform = new Transform2D();
    const resolver = new PolygonCollisionResolver2D(polygon, polygonTransform, shape, shapeTransform);

    expect(() => resolver.resolveCollision()).toThrowError();
  });
});

class UnknownShape extends Shape2D {
  public boundingBox: BoundingBox2D = [
    new Vector2D(),
    new Vector2D(),
    new Vector2D(),
    new Vector2D(),
  ];
  public isCollidingWith = vi.fn();
  public draw = vi.fn();
}
