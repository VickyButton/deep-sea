import { Transform2D } from '../Transform2D';
import { Vector2D } from '../Vector2D';
import { PolygonCollisionResolver2D } from './collisionResolvers/PolygonCollisionResolver2D';
import { PolygonShape2D } from './PolygonShape2D';
import { describe, expect, it, vi } from 'vitest';

describe('PolygonShape2D', () => {
  it('should be a triangle by default', () => {
    const polygon = new PolygonShape2D();

    expect(polygon.vertices).toEqual([
      new Vector2D(1, 0),
      new Vector2D(-0.4999999999999998, 0.8660254037844387),
      new Vector2D(-0.5000000000000004, -0.8660254037844385),
    ]);
  });

  it('should throw if an invalid vertices are passed', () => {
    expect(() => new PolygonShape2D({
      vertices: [],
    })).toThrowError();
  });

  it('should compute vertices', () => {
    const polygon = new PolygonShape2D({
      vertices: VERTICES,
    });

    expect(polygon.vertices).toEqual([
      new Vector2D(1, 0),
      new Vector2D(-0.4999999999999998, 0.8660254037844387),
      new Vector2D(-0.5000000000000004, -0.8660254037844385),
    ]);
  });

  it('should compute bounding box', () => {
    const polygon = new PolygonShape2D({
      vertices: VERTICES,
    });

    expect(polygon.boundingBox).toEqual([
      new Vector2D(1, 0.8660254037844387),
      new Vector2D(-0.5000000000000004, 0.8660254037844387),
      new Vector2D(-0.5000000000000004, -0.8660254037844385),
      new Vector2D(1, -0.8660254037844385),
    ]);
  });

  it('should use polygon collision resolver to resolve collisions', () => {
    vi.mock('./collisionResolvers/PolygonCollisionResolver2D');

    const polygonA = new PolygonShape2D();
    const transformA = new Transform2D;
    const polygonB = new PolygonShape2D();
    const transformB = new Transform2D;

    polygonA.isCollidingWith(transformA, polygonB, transformB);

    expect(PolygonCollisionResolver2D).toHaveBeenCalledWith(polygonA, transformA, polygonB, transformB);
  });

  it('should determine if shape is a polygon', () => {
    const shape = new PolygonShape2D();

    expect(PolygonShape2D.isPolygon(shape)).toBe(true);
  });
});

const VERTICES = [
  new Vector2D(1, 0),
  new Vector2D(-0.4999999999999998, 0.8660254037844387),
  new Vector2D(-0.5000000000000004, -0.8660254037844385),
];
