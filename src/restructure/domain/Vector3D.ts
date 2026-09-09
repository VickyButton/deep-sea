import { Vector2D } from './Vector2D';

/**
 * A 3D vector.
 */
export class Vector3D {
  /** The vector's X component. */
  public x: number;
  /** The vector's Y component. */
  public y: number;
  /** The vector's Z component. */
  public z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /** The vector's X component. */
  public get 0() {
    return this.x;
  }

  public set 0(x: number) {
    this.x = x;
  }

  /** The vector's Y component. */
  public get 1() {
    return this.y;
  }

  public set 1(y: number) {
    this.y = y;
  }

  /** The vector's Z component. */
  public get 2() {
    return this.z;
  }

  public set 2(z: number) {
    this.z = z;
  }

  /** The length of the vector. */
  public get length() {
    return Math.sqrt(this.xSquared + this.ySquared + this.zSquared);
  }

  private get xSquared() {
    return Math.pow(this.x, 2);
  }

  private get ySquared() {
    return Math.pow(this.y, 2);
  }

  private get zSquared() {
    return Math.pow(this.z, 2);
  }

  /**
   * Computes the sum resulting from adding this vector to another vector.
   * @param vector The vector to add to this vector.
   * @returns The sum vector.
   */
  public add(vector: Vector3D) {
    const sumX = this.x + vector.x;
    const sumY = this.y + vector.y;
    const sumZ = this.z + vector.z;

    return new Vector3D(sumX, sumY, sumZ);
  }

  /**
   * Computes the difference resulting from subtracting this vector by another vector.
   * @param vector The vector to subtract this vector by.
   * @returns The difference vector.
   */
  public subtract(vector: Vector3D) {
    const differenceX = this.x - vector.x;
    const differenceY = this.y - vector.y;
    const differenceZ = this.z - vector.z;

    return new Vector3D(differenceX, differenceY, differenceZ);
  }

  /**
   * Computes the product resulting from multiplying this vector by another vector.
   * @param vector The vector to multiply this vector by.
   * @returns The product vector.
   */
  public multiply(vector: Vector3D) {
    const productX = this.x * vector.x;
    const productY = this.y * vector.y;
    const productZ = this.z * vector.z;

    return new Vector3D(productX, productY, productZ);
  }

  /**
   * Computes the product resulting from dividing this vector by another vector.
   * @param vector The vector to divide this vector by.
   * @returns The quotient vector.
   */
  public divide(vector: Vector3D) {
    const quotientX = this.x / vector.x;
    const quotientY = this.y / vector.y;
    const quotientZ = this.z / vector.z;

    return new Vector3D(quotientX, quotientY, quotientZ);
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param vector The vector to compare equality to.
   * @returns True if equal, false if not.
   */
  public equals(vector: Vector3D) {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z;
  }

  /**
   * Computes the unit vector for this vector.
   * @returns The unit vector for this vector.
   */
  public normalize() {
    const magnitude = this.length;
    const normalizedX = this.x / magnitude;
    const normalizedY = this.y / magnitude;
    const normalizedZ = this.z / magnitude;

    return new Vector3D(normalizedX, normalizedY, normalizedZ);
  }

  /**
   * Creates a 2D copy of the vector.
   * @returns The 2D copy of the vector.
   */
  public to2D() {
    return new Vector2D(this.x, this.y);
  }

  /**
   * Creates a 3D vector from a 2D vector.
   * @param vector A 2D vector.
   * @returns A 3D vector with the X and Y components of the 2D vector.
   */
  public static from2D(vector2D: Vector2D) {
    return new Vector3D(vector2D.x, vector2D.y);
  }
}
