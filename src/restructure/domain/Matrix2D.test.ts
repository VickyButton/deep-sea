import { Matrix2D } from './Matrix2D';
import { Vector2D } from './Vector2D';
import { describe, expect, it } from 'vitest';

describe('Matrix2D', () => {
  it('should multiply a matrix', () => {
    const right = new Matrix2D([
      new Vector2D(1, 2),
      new Vector2D(3, 4),
    ]);
    const left = new Matrix2D([
      new Vector2D(1, 2),
      new Vector2D(3, 4),
    ]);
    const product = right.multiplyMatrix(left);

    expect(product).toEqual(new Matrix2D([
      new Vector2D(7, 10),
      new Vector2D(15, 22),
    ]));
  });

  it('should multiply a vector', () => {
    const matrix = new Matrix2D([
      new Vector2D(1, 2),
      new Vector2D(3, 4),
    ]);
    const vector = new Vector2D(1, 2);
    const result = matrix.multiplyVector(vector);

    expect(result).toEqual(new Vector2D(7, 10));
  });
});
