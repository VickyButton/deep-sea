import { Matrix3D } from './Matrix3D';
import { Vector2 } from '../vector2/Vector2';
import { Vector3 } from '../vector3/Vector3';
import { describe, expect, it } from 'vitest';

describe('Matrix3D', () => {
  it('should multiply a matrix', () => {
    const right = new Matrix3D([
      new Vector3(1, 2, 3),
      new Vector3(4, 5, 6),
      new Vector3(7, 8, 9),
    ]);
    const left = new Matrix3D([
      new Vector3(1, 2, 3),
      new Vector3(4, 5, 6),
      new Vector3(7, 8, 9),
    ]);
    const product = right.multiplyMatrix(left);

    expect(product).toEqual(new Matrix3D([
      new Vector3(30, 36, 42),
      new Vector3(66, 81, 96),
      new Vector3(102, 126, 150),
    ]));
  });

  it('should multiply a 3D vector', () => {
    const matrix = new Matrix3D([
      new Vector3(1, 2, 3),
      new Vector3(4, 5, 6),
      new Vector3(7, 8, 9),
    ]);
    const vector = new Vector3(1, 2, 3);
    const result = matrix.multiplyVector3D(vector);

    expect(result).toEqual(new Vector3(30, 36, 42));
  });

  it('should multiply a 2D vector', () => {
    const matrix = new Matrix3D([
      new Vector3(1, 2, 3),
      new Vector3(4, 5, 6),
      new Vector3(7, 8, 9),
    ]);
    const vector = new Vector2(1, 2);
    const result = matrix.multiplyVector2D(vector);

    expect(result).toEqual(new Vector2(16, 20));
  });
});
