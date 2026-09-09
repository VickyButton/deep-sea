import { Vector3D } from './Vector3D';

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
   * Calculates the product resulting from multiplying this matrix by another matrix.
   * @param matrix The matrix to multiply by.
   * @returns The resulting product matrix.
   */
  public multiplyMatrix(matrix: Matrix3D) {
    const product = new Matrix3D();
    product[0] = matrix.multiplyVector(this[0]);
    product[1] = matrix.multiplyVector(this[1]);
    product[2] = matrix.multiplyVector(this[2]);
    return product;
  }

  /**
   * Calculates the vector resulting from multiplying this matrix by a vector.
   * @param vector The vector to multiply by.
   * @returns The resulting product vector.
   */
  public multiplyVector(vector: Vector3D) {
    const x = vector.x * this[0][0] + vector.y * this[1][0] + vector.z * this[2][0];
    const y = vector.x * this[0][1] + vector.y * this[1][1] + vector.z * this[2][1];
    const z = vector.x * this[0][2] + vector.y * this[1][2] + vector.z * this[2][2];
    return new Vector3D(x, y, z);
  }
}
