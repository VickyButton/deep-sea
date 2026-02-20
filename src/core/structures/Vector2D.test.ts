import { describe, expect, it } from 'vitest';
import { Vector2D } from './Vector2D';

describe('Vector2D', () => {
  it('should set vector components', () => {
    const vector = new Vector2D();

    vector.set(1, 1);

    expect(vector.equals(new Vector2D(1, 1))).toBe(true);
  });

  it('should calculate magnitude', () => {
    const vector = new Vector2D(3, 4);

    expect(vector.magnitude).toEqual(5);
  });

  it('should add two vectors', () => {
    const addend1 = new Vector2D(1, 1);
    const addend2 = new Vector2D(1, 1);
    const sum = Vector2D.add(addend1, addend2);

    expect(sum.x).toBe(2);
    expect(sum.y).toBe(2);
  });

  it('should subtract two vectors', () => {
    const minuend = new Vector2D(1, 1);
    const subtrahend = new Vector2D(1, 1);
    const difference = Vector2D.subtract(minuend, subtrahend);

    expect(difference.x).toBe(0);
    expect(difference.y).toBe(0);
  });

  it('should multiply two vectors', () => {
    const multiplier = new Vector2D(2, 2);
    const multiplicand = new Vector2D(2, 2);
    const product = Vector2D.multiply(multiplier, multiplicand);

    expect(product.x).toBe(4);
    expect(product.y).toBe(4);
  });

  it('should divide two vectors', () => {
    const dividend = new Vector2D(4, 4);
    const divisor = new Vector2D(2, 2);
    const quotient = Vector2D.divide(dividend, divisor);

    expect(quotient.x).toBe(2);
    expect(quotient.y).toBe(2);
  });

  it('should compare two vectors for equality', () => {
    const vector = new Vector2D(0, 0);

    expect(vector.equals(new Vector2D(0, 0))).toBe(true);
    expect(vector.equals(new Vector2D(1, 0))).toBe(false);
    expect(vector.equals(new Vector2D(0, 1))).toBe(false);
    expect(vector.equals(new Vector2D(1, 1))).toBe(false);
  });
});
