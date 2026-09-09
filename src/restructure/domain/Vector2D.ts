/**
 * A 2D vector.
 */
export class Vector2D {
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

  /** The length of the vector. */
  public get length() {
    return Math.sqrt(this.xSquared + this.ySquared);
  }

  private get xSquared() {
    return Math.pow(this.x, 2);
  }

  private get ySquared() {
    return Math.pow(this.y, 2);
  }

  /** The angle of the vector in radians. */
  public get angle() {
    return Math.atan(this.y / this.x);
  }

  /**
   * Calculates the sum resulting from adding this vector to another vector.
   * @param vector The vector to add to this vector.
   * @returns The sum vector.
   */
  public add(vector: Vector2D) {
    const sumX = this.x + vector.x;
    const sumY = this.y + vector.y;

    return new Vector2D(sumX, sumY);
  }

  /**
   * Calculates the difference resulting from subtracting this vector by another vector.
   * @param vector The vector to subtract this vector by.
   * @returns The difference vector.
   */
  public subtract(vector: Vector2D) {
    const differenceX = this.x - vector.x;
    const differenceY = this.y - vector.y;

    return new Vector2D(differenceX, differenceY);
  }

  /**
   * Calculates the product resulting from multiplying this vector by another vector.
   * @param vector The vector to multiply this vector by.
   * @returns The product vector.
   */
  public multiply(vector: Vector2D) {
    const productX = this.x * vector.x;
    const productY = this.y * vector.y;

    return new Vector2D(productX, productY);
  }

  /**
   * Calculates the product resulting from dividing this vector by another vector.
   * @param vector The vector to divide this vector by.
   * @returns The quotient vector.
   */
  public divide(vector: Vector2D) {
    const quotientX = this.x / vector.x;
    const quotientY = this.y / vector.y;

    return new Vector2D(quotientX, quotientY);
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param vector The vector to compare equality to.
   * @returns True if equal, false if not.
   */
  public equals(vector: Vector2D) {
    return this.x === vector.x && this.y === vector.y;
  }

  /**
   * Calculates the unit vector for this vector.
   * @returns The unit vector for this vector.
   */
  public normalize() {
    const magnitude = this.length;
    const normalizedX = this.x / magnitude;
    const normalizedY = this.y / magnitude;

    return new Vector2D(normalizedX, normalizedY);
  }
}
