import type { Vector2D } from './Vector2D';
import { Vector3D } from './Vector3D';

/**
 * A 3D matrix.
 */
export class Matrix3D {
  /** The matrix's columns. */
  public columns: [Vector3D, Vector3D, Vector3D];

  /** The first column of the matrix. */
  public get 0() {
    return this.columns[0];
  }

  public set 0(vector: Vector3D) {
    this.columns[0] = vector;
  }

  /** The second column of the matrix. */
  public get 1() {
    return this.columns[1];
  }

  public set 1(vector: Vector3D) {
    this.columns[1] = vector;
  }

  /** The third column of the matrix. */
  public get 2() {
    return this.columns[2];
  }

  public set 2(vector: Vector3D) {
    this.columns[2] = vector;
  }

  constructor(columns: [Vector3D, Vector3D, Vector3D] = [new Vector3D(), new Vector3D(), new Vector3D()]) {
    this.columns = columns;
  }

  /**
   * Computes the product resulting from multiplying this matrix by another matrix.
   * @param matrix The matrix to multiply by.
   * @returns The resulting product matrix.
   */
  public multiplyMatrix(matrix: Matrix3D) {
    const product = new Matrix3D();
    product[0] = matrix.multiplyVector3D(this[0]);
    product[1] = matrix.multiplyVector3D(this[1]);
    product[2] = matrix.multiplyVector3D(this[2]);
    return product;
  }

  /**
   * Computes the 3D vector resulting from multiplying this matrix by a 3D vector.
   * @param vector The 3D vector to multiply by.
   * @returns The resulting 3D product vector.
   */
  public multiplyVector3D(vector: Vector3D) {
    const x = vector.x * this[0][0] + vector.y * this[1][0] + vector.z * this[2][0];
    const y = vector.x * this[0][1] + vector.y * this[1][1] + vector.z * this[2][1];
    const z = vector.x * this[0][2] + vector.y * this[1][2] + vector.z * this[2][2];
    return new Vector3D(x, y, z);
  }

  /**
   * Computes the 2D vector resulting from multiplying this matrix by a 2D vector.
   * @param vector The 2D vector to multiply by.
   * @returns The resulting 2D product vector.
   */
  public multiplyVector2D(vector: Vector2D) {
    return this.multiplyVector3D(new Vector3D(vector.x, vector.y, 1)).to2D();
  }
}
