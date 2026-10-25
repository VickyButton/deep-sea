import { Shape2D_Rectangle } from './Shape2D_Rectangle';
import { Transform2D } from '../transform2D/Transform2D';
import { Vector2D } from '../vector2D/Vector2D';
import { CollisionResolver2D_Rectangle } from './collisionResolver2D/CollisionResolver2D_Rectangle';
import { describe, expect, it, vi } from 'vitest';

describe('Shape2D_Rectangle', () => {
  it('should get width', () => {
    const rectangle = new Shape2D_Rectangle(1, 1);

    expect(rectangle.width).toBe(1);
  });

  it('should get height', () => {
    const rectangle = new Shape2D_Rectangle(1, 1);

    expect(rectangle.height).toBe(1);
  });

  it('should compute bounding box', () => {
    const rectangle = new Shape2D_Rectangle(1, 1);

    expect(rectangle.boundingBox).toEqual([
      new Vector2D(0.5, 0.5),
      new Vector2D(-0.5, 0.5),
      new Vector2D(-0.5, -0.5),
      new Vector2D(0.5, -0.5),
    ]);
  });

  it('should compute draw steps', () => {
    const rectangle = new Shape2D_Rectangle(1, 1);

    expect(rectangle.drawSteps).toEqual([
      {
        type: 'DRAW_RECTANGLE',
        x: -0.5,
        y: 0.5,
        width: 1,
        height: 1,
      },
    ]);
  });

  it('should compute vertices', () => {
    const rectangle = new Shape2D_Rectangle(1, 1);

    expect(rectangle.vertices).toEqual([
      new Vector2D(0.5, 0.5),
      new Vector2D(-0.5, 0.5),
      new Vector2D(-0.5, -0.5),
      new Vector2D(0.5, -0.5),
    ]);
  });

  it('should use rectangle collision resolver to resolve collisions', () => {
    vi.mock('./collisionResolver2D/CollisionResolver2D_Rectangle');

    const rectangleA = new Shape2D_Rectangle();
    const transformA = new Transform2D();
    const rectangleB = new Shape2D_Rectangle();
    const transformB = new Transform2D();

    rectangleA.overlaps(transformA, rectangleB, transformB);

    expect(CollisionResolver2D_Rectangle).toHaveBeenCalledWith(rectangleA, transformA, rectangleB, transformB);
  });

  it('should determine if shape is a rectangle', () => {
    const shape = new Shape2D_Rectangle();

    expect(Shape2D_Rectangle.isRectangle(shape)).toBe(true);
  });
});
