import { Transform2D } from './Transform2D';
import { Vector2D } from './Vector2D';
import { describe, expect, it } from 'vitest';

// Cosine(90 degrees) does not return 0, but rather a nuber close to zero.
const ZERO_APPROXIMATION = 6.123233995736766e-17;

describe('Transform2D', () => {
  it('applies translation to vector', () => {
    const transform = new Transform2D({
      translation: [1, 1],
    });
    const vector = new Vector2D(1, 1);
    const result = transform.applyTransform(vector);

    expect(result).toEqual({
      x: 2,
      y: 2,
    });
  });

  it('applies rotation to vector', () => {
    const transform = new Transform2D({
      rotation: Math.PI / 2, // 90 degrees
    });
    const vector = new Vector2D(1, 1);
    const result = transform.applyTransform(vector);

    expect(result).toEqual({
      x: -1 + ZERO_APPROXIMATION,
      y: 1,
    });
  });

  it('applies scaling to vector', () => {
    const transform = new Transform2D({
      scale: [2, 2],
    });
    const vector = new Vector2D(1, 1);
    const result = transform.applyTransform(vector);

    expect(result).toEqual({
      x: 2,
      y: 2,
    });
  });

  it('applies translation and rotation to vector', () => {
    const transform = new Transform2D({
      translation: [1, 1],
      rotation: Math.PI / 2, // 90 degrees
    });
    const vector = new Vector2D(1, 1);
    const result = transform.applyTransform(vector);

    expect(result).toEqual({
      x: 2 * (-1 + ZERO_APPROXIMATION),
      y: 2,
    });
  });

  it('applies translation, rotation, and scaling to vector', () => {
    const transform = new Transform2D({
      translation: [1, 1],
      rotation: Math.PI / 2, // 90 degrees
      scale: [2, 2],
    });
    const vector = new Vector2D(1, 1);
    const result = transform.applyTransform(vector);

    expect(result).toEqual({
      x: 4 * (-1 + ZERO_APPROXIMATION),
      y: 4,
    });
  });
});
