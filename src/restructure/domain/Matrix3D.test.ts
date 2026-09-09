import { Matrix3D } from './Matrix3D';
import { Vector3D } from './Vector3D';
import { describe, expect, it } from 'vitest';

describe('Matrix3D', () => {
  it('should multiply a matrix', () => {
    const right = new Matrix3D([
      new Vector3D(1, 4, 7),
      new Vector3D(2, 5, 8),
      new Vector3D(3, 6, 9),
    ]);
    const left = new Matrix3D([
      new Vector3D(1, 4, 7),
      new Vector3D(2, 5, 8),
      new Vector3D(3, 6, 9),
    ]);
    const product = right.multiplyMatrix(left);

    expect(product).toEqual(new Matrix3D([
      new Vector3D(30, 66, 102),
      new Vector3D(36, 81, 126),
      new Vector3D(42, 96, 150),
    ]));
  });

  it('should multiply a vector', () => {
    const matrix = new Matrix3D([
      new Vector3D(1, 4, 7),
      new Vector3D(2, 5, 8),
      new Vector3D(3, 6, 9),
    ]);
    const vector = new Vector3D(1, 2, 3);
    const result = matrix.multiplyVector(vector);

    expect(result).toEqual(new Vector3D(14, 32, 50));
  });
});
