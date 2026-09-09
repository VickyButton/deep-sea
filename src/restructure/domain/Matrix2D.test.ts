import { Matrix2D } from './Matrix2D';
import { Vector2D } from './Vector2D';
import { describe, expect, it } from 'vitest';

describe('Matrix2D', () => {
  it('should multiply a matrix', () => {
    const right = new Matrix2D([
      new Vector2D(2, 4),
      new Vector2D(8, 16),
    ]);
    const left = new Matrix2D([
      new Vector2D(2, 2),
      new Vector2D(2, 2),
    ]);
    const product = right.multiplyMatrix(left);

    expect(product).toEqual(new Matrix2D([
      new Vector2D(12, 12),
      new Vector2D(48, 48),
    ]));
  });

  it('should multiply a vector', () => {
    const matrix = new Matrix2D([
      new Vector2D(2, 2),
      new Vector2D(2, 2),
    ]);
    const vector = new Vector2D(2, 4);
    const result = matrix.multiplyVector(vector);

    expect(result).toEqual(new Vector2D(12, 12));
  });
});
