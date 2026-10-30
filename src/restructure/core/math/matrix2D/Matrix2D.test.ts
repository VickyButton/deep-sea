import { Matrix2D } from './Matrix2D';
import { Vector2 } from '../vector2/Vector2';
import { describe, expect, it } from 'vitest';

describe('Matrix2D', () => {
  it('should multiply a matrix', () => {
    const right = new Matrix2D([
      new Vector2(1, 2),
      new Vector2(3, 4),
    ]);
    const left = new Matrix2D([
      new Vector2(1, 2),
      new Vector2(3, 4),
    ]);
    const product = right.multiplyMatrix(left);

    expect(product).toEqual(new Matrix2D([
      new Vector2(7, 10),
      new Vector2(15, 22),
    ]));
  });

  it('should multiply a vector', () => {
    const matrix = new Matrix2D([
      new Vector2(1, 2),
      new Vector2(3, 4),
    ]);
    const vector = new Vector2(1, 2);
    const result = matrix.multiplyVector(vector);

    expect(result).toEqual(new Vector2(7, 10));
  });
});
