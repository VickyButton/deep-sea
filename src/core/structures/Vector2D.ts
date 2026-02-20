export class Vector2D {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculates the magnitude of the vector.
   */
  public get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Returns the vector as a normalized vector.
   */
  public normalize() {
    const magnitude = this.magnitude;

    return Vector2D.divide(this, new Vector2D(magnitude, magnitude));
  }

  /**
   * Sets components of the vector.
   *
   * @param x The x component of the vector.
   * @param y The y component of the vector.
   */
  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Compares two vectors for equality.
   *
   * @param vector The vector to compare for equality.
   * @returns True if equal, false if not.
   */
  public equals(vector: Vector2D) {
    return this.x === vector.x && this.y === vector.y;
  }

  /**
   * Represents a zero vector.
   *
   * @returns A vector representing zero.
   */
  public static get zero() {
    return new Vector2D(0, 0);
  }

  /**
   * Represents a one vector.
   *
   * @returns A vector representing one.
   */
  public static get one() {
    return new Vector2D(1, 1);
  }

  /**
   * Represents an upwards direction.
   *
   * @returns A vector representing an upwards direction.
   */
  public static get up() {
    return new Vector2D(0, -1);
  }

  /**
   * Represents a leftwards direction.
   *
   * @returns A vector representing a leftwards direction.
   */
  public static get left() {
    return new Vector2D(-1, 0);
  }

  /**
   * Represents a downwards direction.
   *
   * @returns A vector representing a downwards direction.
   */
  public static get down() {
    return new Vector2D(0, 1);
  }

  /**
   * Represents a rightwards direction.
   *
   * @returns A vector representing a rightwards direction.
   */
  public static get right() {
    return new Vector2D(1, 0);
  }

  /**
   * Adds two vectors together.
   *
   * @param addend1 The first addend vector.
   * @param addend2 The second addend vector.
   * @returns The sum of the two vectors.
   */
  public static add(addend1: Vector2D, addend2: Vector2D) {
    return new Vector2D(addend1.x + addend2.x, addend1.y + addend2.y);
  }

  /**
   * Subtracts a subtrahend vector from a minuend vector.
   *
   * @param minuend The vector to subtract from.
   * @param subtrahend The vector to subtract.
   * @returns The difference of the two vectors.
   */
  public static subtract(minuend: Vector2D, subtrahend: Vector2D) {
    return new Vector2D(minuend.x - subtrahend.x, minuend.y - subtrahend.y);
  }

  /**
   * Multiplies a multiplicand vector by a multiplier vector.
   *
   * @param multiplier The vector to multiply by.
   * @param multiplicand The vector to multiply.
   * @returns The product of the two vectors.
   */
  public static multiply(multiplier: Vector2D, multiplicand: Vector2D) {
    return new Vector2D(multiplier.x * multiplicand.x, multiplier.y * multiplicand.y);
  }

  /**
   * Divides a dividend vector by a divisor vector.
   *
   * @param dividend The vector to be divided (numerator).
   * @param divisor The vector by which to divide (denominator).
   * @returns The quotient of the two vectors.
   */
  public static divide(dividend: Vector2D, divisor: Vector2D) {
    return new Vector2D(dividend.x / divisor.x, dividend.y / divisor.y);
  }
}
