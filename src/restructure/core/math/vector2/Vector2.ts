/** A vector consisting of 2 components. */
export class Vector2 {
  /** The vector's X component. */
  public x: number;
  /** The vector's Y component. */
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
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

  /** The angle of the vector in radians. */
  public get angle() {
    return Math.atan2(this.y, this.x);
  }

  /** The length of the vector. */
  public get length() {
    return Math.sqrt(this.xSquared + this.ySquared);
  }

  private get xSquared() {
    return this.x * this.x;
  }

  private get ySquared() {
    return this.y * this.y;
  }

  /** The vector normalized as a unit vector. */
  public get normalized() {
    const magnitude = this.length;
    const normalizedX = this.x / magnitude;
    const normalizedY = this.y / magnitude;

    return new Vector2(normalizedX, normalizedY);
  }

  /**
   * Adds another vector to this vector.
   * @param vector The vector to add to this vector.
   * @returns This vector.
   */
  public add(vector: Vector2) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  /**
   * Subtracts this vector by another vector.
   * @param vector The vector to subtract this vector by.
   * @returns This vector.
   */
  public subtract(vector: Vector2) {
    return this.add(new Vector2(-vector.x, -vector.y));
  }

  /**
   * Scales this vector's components by a scalar.
   * @param scalar The scalar to multiply this vector's components by.
   * @returns This vector.
   */
  public scale(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * Computes the sum of the X and Y components of a vector product.
   * @param vector The vector to multiply this vector by.
   * @returns The dot product of the two vectors.
   */
  public computeDotProduct(vector: Vector2) {
    const productX = this.x * vector.x;
    const productY = this.y * vector.y;

    return productX + productY;
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param vector The vector to compare equality to.
   * @returns True if equal, false if not.
   */
  public equals(vector: Vector2) {
    return this.x === vector.x && this.y === vector.y;
  }

  /**
   * Creates a copy of this vector.
   * @returns A copy of this vector.
   */
  public copy() {
    return new Vector2(this.x, this.y);
  }

  /** Creates a vector pointing up. */
  public static get UP() {
    return new Vector2(0, 1);
  }

  /** Creates a vector pointing down. */
  public static get DOWN() {
    return new Vector2(0, -1);
  }

  /** Creates a vector pointing right. */
  public static get RIGHT() {
    return new Vector2(1, 0);
  }

  /** Creates a vector pointing left. */
  public static get LEFT() {
    return new Vector2(-1, 0);
  }
}
