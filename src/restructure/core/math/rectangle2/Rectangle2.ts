import { Vector2 } from '../vector2/Vector2';

/** A 2D axis-aligned rectangle. */
export class Rectangle2 {
  /** The bottom-left corner of the rectangle. */
  public position: Vector2;
  /** The size of the rectangle. */
  public size: Vector2;

  /**
   * Creates a new Rectangle2.
   * @param x The X component of the rectangle's position.
   * @param y The Y component of the rectangle's position.
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   */
  constructor(x = 0, y = 0, width = 1, height = 1) {
    this.position = new Vector2(x, y);
    this.size = new Vector2(width, height);
  }

  /** The X component of the rectangle's position. */
  public get x() {
    return this.position.x;
  }

  /**
   * Sets the X component of the rectangle's position.
   * @param x The number to set the rectangle's X component to.
   */
  public set x(x: number) {
    this.position.x = x;
  }

  /** The Y component of the rectangle's position. */
  public get y() {
    return this.position.y;
  }

  /**
   * Sets the Y component of the rectangle's position.
   * @param y The number to set the rectangle's Y component to.
   */
  public set y(y: number) {
    this.position.y = y;
  }

  /** The width of the rectangle */
  public get width() {
    return this.size.x;
  }

  /**
   * Sets the rectangle's width.
   * @param width The number to set the rectangle's width to.
   */
  public set width(width: number) {
    this.size.x = width;
  }

  /** The height of the rectangle */
  public get height() {
    return this.size.y;
  }

  /**
   * Sets the rectangle's height.
   * @param height The number to set the rectangle's height to.
   */
  public set height(height: number) {
    this.size.y = height;
  }

  /** The X component of the rectangle's left side . */
  public get left() {
    return this.position.x;
  }

  /** The X component of the rectangle's right side . */
  public get right() {
    return this.position.x + this.size.x;
  }

  /** The Y component of the rectangle's bottom side . */
  public get bottom() {
    return this.position.y;
  }

  /** The Y component of the rectangle's top side . */
  public get top() {
    return this.position.y + this.size.y;
  }
}
