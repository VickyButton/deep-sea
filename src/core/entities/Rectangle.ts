import { Vector2D } from './Vector2D';

/**
 * Rectangles are defined by a position and a size, where the position is the top-left corner of
 * the rectangle and X increases to the right and Y increases downwards.
 */
export class Rectangle {
  public readonly position: Vector2D;
  public readonly size: Vector2D;

  constructor(x: number, y: number, width: number, height: number) {
    this.position = new Vector2D(x, y);
    this.size = new Vector2D(width, height);
  }

  /**
   * The x position of the rectangle.
   */
  public get x() {
    return this.position.x;
  }

  /**
   * The y position of the rectangle.
   */
  public get y() {
    return this.position.y;
  }

  /**
   * The width of the rectangle.
   */
  public get width() {
    return this.size.x;
  }

  /**
   * The height of the rectangle.
   */
  public get height() {
    return this.size.y;
  }

  /**
   * The top side of the rectangle.
   */
  public get top() {
    return this.position.y;
  }

  /**
   * The left side of the rectangle.
   */
  public get left() {
    return this.position.x;
  }

  /**
   * The bottom side of the rectangle.
   */
  public get bottom() {
    return this.position.y + this.size.y;
  }

  /**
   * The right side of the rectangle.
   */
  public get right() {
    return this.position.x + this.size.x;
  }

  /**
   * Checks if a point is contained within the rectangle.
   *
   * @param point The point to check if it is contained in the rectangle.
   */
  public contains(point: Vector2D) {
    return (
      point.x > this.left && point.x < this.right && point.y > this.top && point.y < this.bottom
    );
  }

  /**
   * Checks if the rectangle overlaps another.
   */
  public overlaps(rectangle: Rectangle) {
    return (
      rectangle.left < this.right &&
      rectangle.right > this.left &&
      rectangle.top < this.bottom &&
      rectangle.bottom > this.top
    );
  }
}
