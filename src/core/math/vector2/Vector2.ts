/** A vector consisting of 2 components. */
export class Vector2 {
  /** The vector's X component. */
  public x: number;
  /** The vector's Y component. */
  public y: number;

  /**
   * Creates a new Vector2.
   * @param x The vector's X component.
   * @param y The vector's Y component.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
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

  /** The angle of the vector in radians. */
  public get angle() {
    return Math.atan2(this.y, this.x);
  }

  /** The length of the vector. */
  public get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /** Computes a vector that is perpendicular to this vector in the clockwise direction. */
  public get perpendicularClockwise() {
    return new Vector2(this.y, this.x === 0 ? 0 : -this.x);
  }

  /** A vector that is perpendicular to this vector in the counterclockwise direction. */
  public get perpendicularCounterclockwise() {
    return new Vector2(this.y === 0 ? 0 : -this.y, this.x);
  }

  /** The vector normalized as a unit vector. */
  public get normalized() {
    const vector = new Vector2(this.x, this.y);
    vector.normalize();

    return vector;
  }

  /** Normalizes the vector. */
  public normalize() {
    const lengthSquared = this.lengthSquared;

    if (lengthSquared === 0) {
      this.zero();
    } else {
      this.scale(1 / Math.sqrt(lengthSquared));
    }
  }

  private get lengthSquared() {
    return this.x * this.x + this.y + this.y;
  }

  private zero() {
    this.x = 0;
    this.y = 0;
  }

  /**
   * Scales this vector's components by a scalar.
   * @param scalar The scalar to multiply this vector's components by.
   */
  public scale(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
  }

  /**
   * Adds another vector to this vector.
   * @param other The other vector to add to this vector.
   * @returns The resulting sum vector.
   */
  public add(other: Vector2) {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtracts this vector by another vector.
   * @param other The other vector to subtract this vector by.
   * @returns The resulting difference vector.
   */
  public subtract(other: Vector2) {
    return this.add(new Vector2(-other.x, -other.y));
  }

  /**
   * Computes the dot product of this vector and another vector.
   * @param other The other vector to multiply this vector by.
   * @returns The resulting scalar.
   */
  public dot(other: Vector2) {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Computes the cross product of this vector and another vector.
   * @param other The other vector to multiply this vector by.
   * @returns The resulting scalar.
   */
  public cross(other: Vector2) {
    return this.x * other.y - this.y * other.x;
  }

  /**
   * Checks if this vector is equal to another vector.
   * @param other The other vector to compare equality to.
   * @returns True if equal, false if not.
   */
  public equals(other: Vector2) {
    return this.x === other.x && this.y === other.y;
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
