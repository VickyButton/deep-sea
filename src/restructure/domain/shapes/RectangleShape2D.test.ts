import { Vector2D } from '../Vector2D';
import { RectangleCollisionResolver2D } from './collisionResolvers/RectangleCollisionResolver2D';
import { RectangleShape2D } from './RectangleShape2D';
import { describe, expect, it, vi } from 'vitest';

describe('RectangleShape2D', () => {
  it('should get width', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
    });

    expect(rectangle.width).toBe(1);
  });

  it('should get half-width', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
    });

    expect(rectangle.halfWidth).toBe(0.5);
  });

  it('should update half-width when width is updated', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
    });

    rectangle.width = 2;

    expect(rectangle.halfWidth).toBe(1);
  });

  it('should get height', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
    });

    expect(rectangle.height).toBe(1);
  });

  it('should get half-height', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
    });

    expect(rectangle.halfHeight).toBe(0.5);
  });

  it('should update half-height when height is updated', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
    });

    rectangle.height = 2;

    expect(rectangle.halfHeight).toBe(1);
  });

  it('should get size', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
    });

    expect(rectangle.size).toEqual(new Vector2D(1, 1));
  });

  it('should determine if axis-aligned', () => {
    const rectangle = new RectangleShape2D({
      transform: {
        rotation: 2 * Math.PI,
      },
    });

    expect(rectangle.isAxisAligned).toBe(true);
  });

  it('should determine if not axis-aligned', () => {
    const rectangle = new RectangleShape2D({
      transform: {
        rotation: Math.PI / 4,
      },
    });

    expect(rectangle.isAxisAligned).toBe(false);
  });

  it('should compute vertices', () => {
    const rectangle = new RectangleShape2D({
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
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
    });

    expect(rectangle.boundingBox).toEqual({
      left: -0.5,
      right: 0.5,
      top: 0.5,
      bottom: -0.5,
    });
  });

  it('should apply rotation', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
      transform: {
        rotation: Math.PI / 2, // 90 degrees
      },
    });

    expect(rectangle.vertices).toEqual([
      new Vector2D(-0.49999999999999994, 0.5),
      new Vector2D(-0.5, -0.49999999999999994),
      new Vector2D(0.49999999999999994, -0.5),
      new Vector2D(0.5, 0.49999999999999994),
    ]);
  });

  it('should apply scaling', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
      transform: {
        scale: [2, 2],
      },
    });

    expect(rectangle.vertices).toEqual([
      new Vector2D(1, 1),
      new Vector2D(-1, 1),
      new Vector2D(-1, -1),
      new Vector2D(1, -1),
    ]);
  });

  it('should apply translation', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
      transform: {
        translation: [1, 1],
      },
    });

    expect(rectangle.vertices).toEqual([
      new Vector2D(1.5, 1.5),
      new Vector2D(0.5, 1.5),
      new Vector2D(0.5, 0.5),
      new Vector2D(1.5, 0.5),
    ]);
  });

  it('should apply composite transformation matrix', () => {
    const rectangle = new RectangleShape2D({
      width: 1,
      height: 1,
      transform: {
        rotation: Math.PI / 2, // 90 degrees
        scale: [2, 2],
        translation: [1, 1],
      },
    });

    expect(rectangle.vertices).toEqual([
      new Vector2D(1.1102230246251565e-16, 2),
      new Vector2D(0, 1.1102230246251565e-16),
      new Vector2D(2, 0),
      new Vector2D(2, 2),
    ]);
  });

  it('should use rectangle collision resolver to resolve collisions', () => {
    vi.mock('./collisionResolvers/RectangleCollisionResolver2D');

    const rectangleA = new RectangleShape2D();
    const rectangleB = new RectangleShape2D();

    rectangleA.isCollidingWith(rectangleB);

    expect(RectangleCollisionResolver2D).toHaveBeenCalledWith(rectangleA, rectangleB);
  });

  it('should determine if shape is a rectangle', () => {
    const shape = new RectangleShape2D();

    expect(RectangleShape2D.isRectangle(shape)).toBe(true);
  });
});
