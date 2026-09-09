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
    const result = transform.apply(vector);

    expect(result).toEqual(new Vector2D(2, 2));
  });

  it('applies rotation to vector', () => {
    const transform = new Transform2D({
      rotation: Math.PI / 2, // 90 degrees
    });
    const vector = new Vector2D(1, 1);
    const result = transform.apply(vector);

    expect(result).toEqual(new Vector2D(-1 + ZERO_APPROXIMATION, 1));
  });

  it('applies scaling to vector', () => {
    const transform = new Transform2D({
      scale: [2, 2],
    });
    const vector = new Vector2D(1, 1);
    const result = transform.apply(vector);

    expect(result).toEqual(new Vector2D(2, 2));
  });

  it('applies composite rotation and scaling to vector', () => {
    const transform = new Transform2D({
      rotation: Math.PI / 2, // 90 degrees
      scale: [2, 2],
    });
    const vector = new Vector2D(1, 0);
    const result = transform.apply(vector);

    expect(result).toEqual(new Vector2D(2 * ZERO_APPROXIMATION, 2));
  });

  it('applies composite rotation, scaling, and translation to vector', () => {
    const transform = new Transform2D({
      rotation: Math.PI / 2, // 90 degrees
      scale: [2, 2],
      translation: [1, 1],
    });
    const vector = new Vector2D(1, 0);
    const result = transform.apply(vector);

    expect(result).toEqual(new Vector2D(1 + 2 * ZERO_APPROXIMATION, 3));
  });
});
