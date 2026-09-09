import { Vector2D } from './Vector2D';

export class Matrix2D {
  public vectors: [Vector2D, Vector2D];

  public get x() {
    return this.vectors[0];
  }

  public set x(vector: Vector2D) {
    this.vectors[0] = vector;
  }

  public get y() {
    return this.vectors[1];
  }

  public set y(vector: Vector2D) {
    this.vectors[1] = vector;
  }

  public get 0() {
    return this.vectors[0];
  }

  public set 0(vector: Vector2D) {
    this.vectors[0] = vector;
  }

  public get 1() {
    return this.vectors[1];
  }

  public set 1(vector: Vector2D) {
    this.vectors[1] = vector;
  }

  constructor(vectors: [Vector2D, Vector2D] = [new Vector2D(), new Vector2D()]) {
    this.vectors = vectors;
  }

  public multiplyMatrix(matrix: Matrix2D) {
    const product = new Matrix2D();
    product[0] = matrix.multiplyVector(this[0]);
    product[1] = matrix.multiplyVector(this[1]);
    return product;
  }

  public multiplyVector(vector: Vector2D) {
    const x = vector.x * this[0][0] + vector.y * this[1][0];
    const y = vector.x * this[0][1] + vector.y * this[1][1];
    return new Vector2D(x, y);
  }
}
