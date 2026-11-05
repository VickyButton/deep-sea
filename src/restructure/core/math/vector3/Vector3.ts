import { Vector2 } from '../vector2/Vector2';

/** A vector consisting of 3 components. */
export class Vector3 {
  /** The vector's X component. */
  public x: number;
  /** The vector's Y component. */
  public y: number;
  /** The vector's Z component. */
  public z: number;

  /**
   * Creates a new Vector3.
   * @param x The vector's X component.
   * @param y The vector's Y component.
   * @param z The vector's Z component.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /** The vector's X component. */
  public get 0() {
    return this.x;
  }

  /**
   * Sets the vector's X component.
   * @param x The number to set the vector's X component to.
   */
  public set 0(x: number) {
    this.x = x;
  }

  /** The vector's Y component. */
  public get 1() {
    return this.y;
  }

  /**
   * Sets the vector's Y component.
   * @param y The number to set the vector's Y component to.
   */
  public set 1(y: number) {
    this.y = y;
  }

  /** The vector's Z component. */
  public get 2() {
    return this.z;
  }

  /**
   * Sets the vector's Z component.
   * @param z The number to set the vector's Z component to.
   */
  public set 2(z: number) {
    this.z = z;
  }

  /** The length of the vector. */
  public get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /** The vector normalized as a unit vector. */
  public get normalized() {
    const magnitude = this.length;
    const normalizedX = this.x / magnitude;
    const normalizedY = this.y / magnitude;
    const normalizedZ = this.z / magnitude;

    return new Vector3(normalizedX, normalizedY, normalizedZ);
  }

  /**
   * Computes the sum resulting from adding this vector to another vector.
   * @param vector The vector to add to this vector.
   * @returns The sum vector.
   */
  public add(vector: Vector3) {
    const sumX = this.x + vector.x;
    const sumY = this.y + vector.y;
    const sumZ = this.z + vector.z;

    return new Vector3(sumX, sumY, sumZ);
  }

  /**
   * Computes the difference resulting from subtracting this vector by another vector.
   * @param vector The vector to subtract this vector by.
   * @returns The difference vector.
   */
  public subtract(vector: Vector3) {
    const differenceX = this.x - vector.x;
    const differenceY = this.y - vector.y;
    const differenceZ = this.z - vector.z;

    return new Vector3(differenceX, differenceY, differenceZ);
  }

  /**
   * Scales this vector's components by a scalar.
   * @param scalar The scalar to multiply this vector's components by.
   */
  public scale(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  }

  /**
   * Computes the product resulting from multiplying this vector by another vector.
   * @param vector The vector to multiply this vector by.
   * @returns The product vector.
   */
  public multiply(vector: Vector3) {
    const productX = this.x * vector.x;
    const productY = this.y * vector.y;
    const productZ = this.z * vector.z;

    return new Vector3(productX, productY, productZ);
  }

  /**
   * Computes the sum of the X, Y, and Z components of a vector product.
   * @param vector The vector to multiply this vector by.
   * @returns The dot product of the two vectors.
   */
  public computeDotProduct(vector: Vector3) {
    const productX = this.x * vector.x;
    const productY = this.y * vector.y;
    const productZ = this.z * vector.z;

    return productX + productY + productZ;
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param vector The vector to compare equality to.
   * @returns True if equal, false if not.
   */
  public equals(vector: Vector3) {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z;
  }

  /**
   * Creates a copy of this vector.
   * @returns A copy of this vector.
   */
  public copy() {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Creates a 2D copy of the vector.
   * @returns The 2D copy of the vector.
   */
  public to2D() {
    return new Vector2(this.x, this.y);
  }

  /**
   * Creates a 3D vector from a 2D vector.
   * @param vector A 2D vector.
   * @returns A 3D vector with the X and Y components of the 2D vector.
   */
  public static from2D(vector2D: Vector2) {
    return new Vector3(vector2D.x, vector2D.y);
  }
}
