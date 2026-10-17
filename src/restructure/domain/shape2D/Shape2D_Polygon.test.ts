import { Transform2D } from '../Transform2D';
import { Vector2D } from '../Vector2D';
import { CollisionResolver2D_Polygon } from './collisionResolvers/CollisionResolver2D_Polygon';
import { Shape2D_Polygon } from './Shape2D_Polygon';
import { describe, expect, it, vi } from 'vitest';

describe('Shape2D_Polygon', () => {
  it('should be a triangle by default', () => {
    const polygon = new Shape2D_Polygon();

    expect(polygon.vertices).toEqual([
      new Vector2D(1, 0),
      new Vector2D(-0.4999999999999998, 0.8660254037844387),
      new Vector2D(-0.5000000000000004, -0.8660254037844385),
    ]);
  });

  it('should throw if an invalid vertices are passed', () => {
    expect(() => new Shape2D_Polygon({
      vertices: [],
    })).toThrowError();
  });

  it('should compute vertices', () => {
    const polygon = new Shape2D_Polygon({
      vertices: VERTICES,
    });

    expect(polygon.vertices).toEqual([
      new Vector2D(1, 0),
      new Vector2D(-0.4999999999999998, 0.8660254037844387),
      new Vector2D(-0.5000000000000004, -0.8660254037844385),
    ]);
  });

  it('should compute bounding box', () => {
    const polygon = new Shape2D_Polygon({
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
    vi.mock('./collisionResolvers/CollisionResolver2D_Polygon');

    const polygonA = new Shape2D_Polygon();
    const transformA = new Transform2D;
    const polygonB = new Shape2D_Polygon();
    const transformB = new Transform2D;

    polygonA.overlaps(transformA, polygonB, transformB);

    expect(CollisionResolver2D_Polygon).toHaveBeenCalledWith(polygonA, transformA, polygonB, transformB);
  });

  it('should determine if shape is a polygon', () => {
    const shape = new Shape2D_Polygon();

    expect(Shape2D_Polygon.isPolygon(shape)).toBe(true);
  });
});

const VERTICES = [
  new Vector2D(1, 0),
  new Vector2D(-0.4999999999999998, 0.8660254037844387),
  new Vector2D(-0.5000000000000004, -0.8660254037844385),
];
