import { Matrix3D } from './Matrix3D';
import { Vector2D } from './Vector2D';
import { Vector3D } from './Vector3D';
import { describe, expect, it } from 'vitest';

describe('Matrix3D', () => {
  it('should multiply a matrix', () => {
    const right = new Matrix3D([
      new Vector3D(1, 2, 3),
      new Vector3D(4, 5, 6),
      new Vector3D(7, 8, 9),
    ]);
    const left = new Matrix3D([
      new Vector3D(1, 2, 3),
      new Vector3D(4, 5, 6),
      new Vector3D(7, 8, 9),
    ]);
    const product = right.multiplyMatrix(left);

    expect(product).toEqual(new Matrix3D([
      new Vector3D(30, 36, 42),
      new Vector3D(66, 81, 96),
      new Vector3D(102, 126, 150),
    ]));
  });

  it('should multiply a 3D vector', () => {
    const matrix = new Matrix3D([
      new Vector3D(1, 2, 3),
      new Vector3D(4, 5, 6),
      new Vector3D(7, 8, 9),
    ]);
    const vector = new Vector3D(1, 2, 3);
    const result = matrix.multiplyVector3D(vector);

    expect(result).toEqual(new Vector3D(30, 36, 42));
  });

  it('should multiply a 2D vector', () => {
    const matrix = new Matrix3D([
      new Vector3D(1, 2, 3),
      new Vector3D(4, 5, 6),
      new Vector3D(7, 8, 9),
    ]);
    const vector = new Vector2D(1, 2);
    const result = matrix.multiplyVector2D(vector);

    expect(result).toEqual(new Vector2D(16, 20));
  });
});
