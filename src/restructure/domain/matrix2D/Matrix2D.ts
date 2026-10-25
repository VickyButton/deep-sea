import { Vector2 } from '../vector2/Vector2';

/** A 2-dimensional matrix. */
export class Matrix2D {
  public columns: [Vector2, Vector2];

  /** The first column of the matrix. */
  public get 0() {
    return this.columns[0];
  }

  public set 0(vector: Vector2) {
    this.columns[0] = vector;
  }

  /** The second column of the matrix. */
  public get 1() {
    return this.columns[1];
  }

  public set 1(vector: Vector2) {
    this.columns[1] = vector;
  }

  constructor(columns: [Vector2, Vector2] = [new Vector2(), new Vector2()]) {
    this.columns = columns;
  }

  /**
   * Calculates the product resulting from multiplying this matrix by another matrix.
   * @param matrix The matrix to multiply by.
   * @returns The resulting product matrix.
   */
  public multiplyMatrix(matrix: Matrix2D) {
    const product = new Matrix2D();
    product[0] = matrix.multiplyVector(this[0]);
    product[1] = matrix.multiplyVector(this[1]);
    return product;
  }

  /**
   * Calculates the vector resulting from multiplying this matrix by a vector.
   * @param vector The vector to multiply by.
   * @returns The resulting product vector.
   */
  public multiplyVector(vector: Vector2) {
    const x = vector.x * this[0][0] + vector.y * this[1][0];
    const y = vector.x * this[0][1] + vector.y * this[1][1];
    return new Vector2(x, y);
  }
}
