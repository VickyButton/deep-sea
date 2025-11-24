export class Vector2D {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the vector to the passed value.
   *
   * @param value The value to set.
   */
  public set(value: Vector2D) {
    this.x = value.x;
    this.y = value.y;
  }

  /**
   * Adds addend to vector.
   *
   * @param addend The vector to add.
   */
  public add(addend: Vector2D) {
    this.x += addend.x;
    this.y += addend.y;
  }

  /**
   * Subtracts subtrahend from vector.
   *
   * @param subtrahend The vector to subtract.
   */
  public subtract(subtrahend: Vector2D) {
    this.x -= subtrahend.x;
    this.y -= subtrahend.y;
  }

  /**
   * Multiplies vector by multiplicand.
   *
   * @param multiplicand The vector to multiply.
   */
  public multiply(multiplicand: Vector2D) {
    this.x *= multiplicand.x;
    this.y *= multiplicand.y;
  }

  /**
   * Divides vector by divisor.
   *
   * @param divisor The vector to divide.
   */
  public divide(divisor: Vector2D) {
    this.x /= divisor.x;
    this.y /= divisor.y;
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
}
