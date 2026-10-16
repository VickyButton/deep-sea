import { Transform2D } from '../Transform2D';
import { Vector2D } from '../Vector2D';
import { RectangleCollisionResolver2D } from './collisionResolvers/RectangleCollisionResolver2D';
import { Shape2D_Rectangle } from './Shape2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('Shape2D_Rectangle', () => {
  it('should get width', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    expect(rectangle.width).toBe(1);
  });

  it('should get half-width', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    expect(rectangle.halfWidth).toBe(0.5);
  });

  it('should update half-width when width is updated', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    rectangle.width = 2;

    expect(rectangle.halfWidth).toBe(1);
  });

  it('should get height', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    expect(rectangle.height).toBe(1);
  });

  it('should get half-height', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    expect(rectangle.halfHeight).toBe(0.5);
  });

  it('should update half-height when height is updated', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    rectangle.height = 2;

    expect(rectangle.halfHeight).toBe(1);
  });

  it('should get size', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    expect(rectangle.size).toEqual(new Vector2D(1, 1));
  });

  it('should compute vertices', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    expect(rectangle.vertices).toEqual([
      new Vector2D(0.5, 0.5),
      new Vector2D(-0.5, 0.5),
      new Vector2D(-0.5, -0.5),
      new Vector2D(0.5, -0.5),
    ]);
  });

  it('should compute bounding box', () => {
    const rectangle = new Shape2D_Rectangle({
      width: 1,
      height: 1,
    });

    expect(rectangle.boundingBox).toEqual([
      new Vector2D(0.5, 0.5),
      new Vector2D(-0.5, 0.5),
      new Vector2D(-0.5, -0.5),
      new Vector2D(0.5, -0.5),
    ]);
  });

  it('should use rectangle collision resolver to resolve collisions', () => {
    vi.mock('./collisionResolvers/RectangleCollisionResolver2D');

    const rectangleA = new Shape2D_Rectangle();
    const transformA = new Transform2D();
    const rectangleB = new Shape2D_Rectangle();
    const transformB = new Transform2D();

    rectangleA.overlaps(transformA, rectangleB, transformB);

    expect(RectangleCollisionResolver2D).toHaveBeenCalledWith(rectangleA, transformA, rectangleB, transformB);
  });

  it('should determine if shape is a rectangle', () => {
    const shape = new Shape2D_Rectangle();

    expect(Shape2D_Rectangle.isRectangle(shape)).toBe(true);
  });
});
