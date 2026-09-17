import { PolygonCollisionResolver2D } from '../collisionResolvers/PolygonCollisionResolver2D';
import { Vector2D } from '../Vector2D';
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

    expect(polygon.boundingBox).toEqual({
      left: -0.5000000000000004,
      right: 1,
      top: 0.8660254037844387,
      bottom: -0.8660254037844385,
    });
  });

  it('should apply rotation', () => {
    const polygon = new PolygonShape2D({
      vertices: VERTICES,
      transform: {
        rotation: Math.PI, // 180 degrees
      },
    });

    expect(polygon.vertices).toEqual([
      new Vector2D(-1, 1.2246467991473532e-16),
      new Vector2D(0.49999999999999967, -0.8660254037844388),
      new Vector2D(0.5000000000000006, 0.8660254037844384),
    ]);
  });

  it('should apply scaling', () => {
    const polygon = new PolygonShape2D({
      vertices: VERTICES,
      transform: {
        scale: [2, 2],
      },
    });

    expect(polygon.vertices).toEqual([
      new Vector2D(2, 0),
      new Vector2D(-0.9999999999999996, 1.7320508075688774),
      new Vector2D(-1.0000000000000009, -1.732050807568877),
    ]);
  });

  it('should apply translation', () => {
    const polygon = new PolygonShape2D({
      vertices: VERTICES,
      transform: {
        translation: [1, 1],
      },
    });

    expect(polygon.vertices).toEqual([
      new Vector2D(2, 1),
      new Vector2D(0.5000000000000002, 1.8660254037844388),
      new Vector2D(0.49999999999999956, 0.13397459621556151),
    ]);
  });

  it('should apply composite transformation matrix', () => {
    const polygon = new PolygonShape2D({
      vertices: VERTICES,
      transform: {
        rotation: Math.PI, // 180 degrees
        scale: [2, 2],
        translation: [1, 1],
      },
    });

    expect(polygon.vertices).toEqual([
      new Vector2D(-1, 1.0000000000000002),
      new Vector2D(1.9999999999999993, -0.7320508075688776),
      new Vector2D(2.000000000000001, 2.7320508075688767),
    ]);
  });

  it('should use polygon collision resolver to resolve collisions', () => {
    vi.mock('../collisionResolvers/PolygonCollisionResolver2D');

    const polygonA = new PolygonShape2D();
    const polygonB = new PolygonShape2D();

    polygonA.isCollidingWith(polygonB);

    expect(PolygonCollisionResolver2D).toHaveBeenCalledWith(polygonA, polygonB);
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
