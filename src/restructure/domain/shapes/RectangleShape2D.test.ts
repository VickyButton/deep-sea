import { Vector2D } from '../Vector2D';
import { RectangleShape2D } from './RectangleShape2D';
import { describe, expect, it } from 'vitest';

// Cosine(90 degrees) does not return 0, but rather a number close to zero.
const COSINE_90_DEGREES = 6.123233995736766e-17;

describe('RectangleShape2D', () => {
  it('should expose width', () => {
    const rectangleShape = new RectangleShape2D({
      size: [2, 2],
    });

    expect(rectangleShape.width).toBe(2);
  });

  it('should compute half-width', () => {
    const rectangleShape = new RectangleShape2D({
      size: [2, 2],
    });

    expect(rectangleShape.halfWidth).toBe(1);
  });

  it('should expose height', () => {
    const rectangleShape = new RectangleShape2D({
      size: [2, 2],
    });

    expect(rectangleShape.height).toBe(2);
  });

  it('should compute half-height', () => {
    const rectangleShape = new RectangleShape2D({
      size: [2, 2],
    });

    expect(rectangleShape.halfHeight).toBe(1);
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
      size: [2, 2],
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(-1, 1),
      new Vector2D(1, 1),
      new Vector2D(1, -1),
      new Vector2D(-1, -1),
    ]);
  });

  it('should apply rotation', () => {
    const rectangleShape = new RectangleShape2D({
      size: [2, 2],
      transform: {
        rotation: Math.PI / 2, // 90 degrees
      },
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(-1, -1 + COSINE_90_DEGREES),
      new Vector2D(-1 + COSINE_90_DEGREES, 1),
      new Vector2D(1, 1 - COSINE_90_DEGREES),
      new Vector2D(1 - COSINE_90_DEGREES, -1),
    ]);
  });

  it('should apply scaling', () => {
    const rectangleShape = new RectangleShape2D({
      size: [2, 2],
      transform: {
        scale: [2, 2],
      },
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(-2, 2),
      new Vector2D(2, 2),
      new Vector2D(2, -2),
      new Vector2D(-2, -2),
    ]);
  });

  it('should apply translation', () => {
    const rectangleShape = new RectangleShape2D({
      size: [2, 2],
      transform: {
        translation: [1, 1],
      },
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(0, 2),
      new Vector2D(2, 2),
      new Vector2D(2, 0),
      new Vector2D(0, 0),
    ]);
  });

  it('should apply composite transformation matrix', () => {
    const rectangleShape = new RectangleShape2D({
      size: [2, 2],
      transform: {
        rotation: Math.PI / 2, // 90 degrees
        scale: [2, 2],
        translation: [1, 1],
      },
    });

    expect(rectangleShape.vertices).toEqual([
      new Vector2D(-1, -1 + 3 * COSINE_90_DEGREES),
      new Vector2D(-1 + 3 * COSINE_90_DEGREES, 3),
      new Vector2D(3, 3),
      new Vector2D(3, -1),
    ]);
  });
});
