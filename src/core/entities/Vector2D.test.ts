import { describe, expect, it } from 'vitest';
import { Vector2D } from './Vector2D';

describe('Vector2D', () => {
  it('should add two vectors', () => {
    const vector = new Vector2D(1, 1);
    const addend = new Vector2D(1, 1);

    vector.add(addend);

    expect(vector.x).toBe(2);
    expect(vector.y).toBe(2);
  });

  it('should subtract two vectors', () => {
    const vector = new Vector2D(1, 1);
    const subtrahend = new Vector2D(1, 1);

    vector.subtract(subtrahend);

    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
  });

  it('should multiply two vectors', () => {
    const vector = new Vector2D(2, 2);
    const multiplicand = new Vector2D(2, 2);

    vector.multiply(multiplicand);

    expect(vector.x).toBe(4);
    expect(vector.y).toBe(4);
  });

  it('should divide two vectors', () => {
    const vector = new Vector2D(4, 4);
    const divisor = new Vector2D(2, 2);

    vector.divide(divisor);

    expect(vector.x).toBe(2);
    expect(vector.y).toBe(2);
  });

  it('should compare two vectors for equality', () => {
    const vector = new Vector2D(0, 0);

    expect(vector.equals(new Vector2D(0, 0))).toBe(true);
    expect(vector.equals(new Vector2D(1, 0))).toBe(false);
    expect(vector.equals(new Vector2D(0, 1))).toBe(false);
    expect(vector.equals(new Vector2D(1, 1))).toBe(false);
  });
});
