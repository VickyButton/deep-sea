import { Vector2D } from './Vector2D';

export class Circle {
  /**
   * The center position of the circle.
   */
  public readonly position: Vector2D;
  /**
   * The radius of the circle.
   */
  public radius: number;

  /**
   * @param x The center x position of the circle.
   * @param y The center y position of the circle.
   * @param radius The radius of the circle.
   */
  constructor(x: number, y: number, radius: number) {
    this.position = new Vector2D(x, y);
    this.radius = radius;
  }

  /**
   * The x position of the circle.
   */
  public get x() {
    return this.position.x;
  }

  /**
   * The y position of the circle.
   */
  public get y() {
    return this.position.y;
  }

  /**
   * The calculated diameter of the circle.
   */
  public get diameter() {
    return this.radius * 2;
  }

  /**
   * Sets components of the circle.
   *
   * @param x The center x position of the circle.
   * @param y The center y position of the circle.
   * @param radius The radius of the circle.
   */
  public set(x: number, y: number, radius: number) {
    this.position.x = x;
    this.position.y = y;
    this.radius = radius;
  }

  /**
   * Checks if a point is contained within the circle.
   *
   * @param point The point to check if it is contained in the circle.
   */
  public containsPoint(point: Vector2D) {
    const dx = this.position.x - point.x;
    const dy = this.position.y - point.y;

    return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(this.radius, 2);
  }

  /**
   * Checks if another circle overlaps with the circle.
   *
   * @param circle The circle to check if it is overlapping with the circle.
   */
  public overlaps(circle: Circle) {
    const dx = this.position.x - circle.x;
    const dxSquared = Math.pow(dx, 2);
    const dy = this.position.y - circle.y;
    const dySquared = Math.pow(dy, 2);
    const radiiSum = this.radius + circle.radius;

    return (
      dxSquared + dySquared <= Math.pow(radiiSum, 2) &&
      dxSquared + dySquared >= Math.pow(this.radius - circle.radius, 2)
    );
  }
}

/**
 * Rectangles are defined by a position and a size, where the position is the top-left corner of
 * the rectangle and X increases to the right and Y increases downwards.
 */
export class Rectangle {
  /**
   * The top-left corner position of the rectangle.
   */
  public readonly position: Vector2D;
  /**
   * The dimensions of the rectangle.
   */
  public readonly size: Vector2D;

  /**
   * @param x The x position of the rectangle.
   * @param y The y position of the rectangle.
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   */
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
   * Sets components of the rectangle.
   *
   * @param x The x position of the rectangle.
   * @param y The y position of the rectangle.
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   */
  public set(x: number, y: number, width: number, height: number) {
    this.position.x = x;
    this.position.y = y;
    this.size.x = width;
    this.size.y = height;
  }

  /**
   * Checks if a point is contained within the rectangle.
   *
   * @param point The point to check if it is contained in the rectangle.
   */
  public containsPoint(point: Vector2D) {
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
