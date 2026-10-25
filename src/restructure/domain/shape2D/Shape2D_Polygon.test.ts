import { Shape2D_Polygon } from './Shape2D_Polygon';
import { Transform2D } from '../transform2D/Transform2D';
import { Vector2 } from '../vector2/Vector2';
import { CollisionResolver2D_Polygon } from './collisionResolver2D/CollisionResolver2D_Polygon';
import { describe, expect, it, vi } from 'vitest';

describe('Shape2D_Polygon', () => {
  it('should be a triangle by default', () => {
    const polygon = new Shape2D_Polygon();

    expect(polygon.vertices).toEqual([
      new Vector2(1, 0),
      new Vector2(-0.4999999999999998, 0.8660254037844387),
      new Vector2(-0.5000000000000004, -0.8660254037844385),
    ]);
  });

  it('should throw if an invalid vertices are passed', () => {
    expect(() => new Shape2D_Polygon([])).toThrowError();
  });

  it('should compute bounding box', () => {
    const polygon = new Shape2D_Polygon(VERTICES);

    expect(polygon.boundingBox).toEqual([
      new Vector2(1, 0.8660254037844387),
      new Vector2(-0.5000000000000004, 0.8660254037844387),
      new Vector2(-0.5000000000000004, -0.8660254037844385),
      new Vector2(1, -0.8660254037844385),
    ]);
  });

  it('should compute draw steps', () => {
    const polygon = new Shape2D_Polygon(VERTICES);

    expect(polygon.drawSteps).toEqual([
      {
        type: 'DRAW_LINE',
        fromX: 1,
        fromY: 0,
        toX: -0.4999999999999998,
        toY: 0.8660254037844387,
      },
      {
        type: 'DRAW_LINE',
        fromX: -0.4999999999999998,
        fromY: 0.8660254037844387,
        toX: -0.5000000000000004,
        toY: -0.8660254037844385,
      },
      {
        type: 'DRAW_LINE',
        fromX: -0.5000000000000004,
        fromY: -0.8660254037844385,
        toX: 1,
        toY: 0,
      },
    ]);
  });

  it('should compute vertices', () => {
    const polygon = new Shape2D_Polygon(VERTICES);

    expect(polygon.vertices).toEqual([
      new Vector2(1, 0),
      new Vector2(-0.4999999999999998, 0.8660254037844387),
      new Vector2(-0.5000000000000004, -0.8660254037844385),
    ]);
  });

  it('should use polygon collision resolver to resolve collisions', () => {
    vi.mock('./collisionResolver2D/CollisionResolver2D_Polygon');

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
  new Vector2(1, 0),
  new Vector2(-0.4999999999999998, 0.8660254037844387),
  new Vector2(-0.5000000000000004, -0.8660254037844385),
];
