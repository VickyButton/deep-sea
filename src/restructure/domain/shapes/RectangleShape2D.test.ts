import { RectangleCollisionResolver2D } from '../collisionResolvers/RectangleCollisionResolver2D';
import { Vector2D } from '../Vector2D';
import { RectangleShape2D } from './RectangleShape2D';
import { describe, expect, it, vi } from 'vitest';

describe('RectangleShape2D', () => {
  it('should expose width', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
    });

    expect(rectangleShape.width).toBe(1);
  });

  it('should compute half-width', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
    });

    expect(rectangleShape.halfWidth).toBe(0.5);
  });

  it('should expose height', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
    });

    expect(rectangleShape.height).toBe(1);
  });

  it('should compute half-height', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
    });

    expect(rectangleShape.halfHeight).toBe(0.5);
  });

  it('should determine if axis-aligned', () => {
    const rectangleShape = new RectangleShape2D({
      transform: {
        rotation: 2 * Math.PI,
      },
    });

    expect(rectangleShape.isAxisAligned).toBe(true);
  });

  it('should determine if not axis-aligned', () => {
    const rectangleShape = new RectangleShape2D({
      transform: {
        rotation: Math.PI / 4,
      },
    });

    expect(rectangleShape.isAxisAligned).toBe(false);
  });

  it('should compute vertices', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(0.5, 0.5),
      new Vector2D(-0.5, 0.5),
      new Vector2D(-0.5, -0.5),
      new Vector2D(0.5, -0.5),
    ]);
  });

  it('should apply rotation', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
      transform: {
        rotation: Math.PI / 2, // 90 degrees
      },
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(-0.49999999999999994, 0.5),
      new Vector2D(-0.5, -0.49999999999999994),
      new Vector2D(0.49999999999999994, -0.5),
      new Vector2D(0.5, 0.49999999999999994),
    ]);
  });

  it('should apply scaling', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
      transform: {
        scale: [2, 2],
      },
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(1, 1),
      new Vector2D(-1, 1),
      new Vector2D(-1, -1),
      new Vector2D(1, -1),
    ]);
  });

  it('should apply translation', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
      transform: {
        translation: [1, 1],
      },
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(1.5, 1.5),
      new Vector2D(0.5, 1.5),
      new Vector2D(0.5, 0.5),
      new Vector2D(1.5, 0.5),
    ]);
  });

  it('should apply composite transformation matrix', () => {
    const rectangleShape = new RectangleShape2D({
      size: [1, 1],
      transform: {
        rotation: Math.PI / 2, // 90 degrees
        scale: [2, 2],
        translation: [1, 1],
      },
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(1.1102230246251565e-16, 2),
      new Vector2D(0, 1.1102230246251565e-16),
      new Vector2D(2, 0),
      new Vector2D(2, 2),
    ]);
  });

  it('should use rectangle collision resolver to resolve collisions', () => {
    vi.mock('../collisionResolvers/RectangleCollisionResolver2D');

    const rectangleShape = new RectangleShape2D();
    const otherShape = new RectangleShape2D();

    rectangleShape.isCollidingWith(otherShape);

    expect(RectangleCollisionResolver2D).toHaveBeenCalledWith(rectangleShape, otherShape);
  });
});
