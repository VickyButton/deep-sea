import { Vector2D } from './Vector2D';

export abstract class Shape {
  /**
   * Checks if a point is contained within the shape.
   * @param point The point to check.
   * @returns True if the point is contained within the shape, false if not.
   */
  public abstract containsPoint(point: Vector2D): boolean;

  // TODO: Add abstract containsShape method.

  /**
   * Checks if another shape overlaps the shape.
   * @param shape The shape to check.
   * @return True if the shape overlaps the shape, false if not.
   */
  public abstract overlaps(shape: Shape): boolean;

  /**
   * Checks if a given value is an instance of Shape.
   * @param node The value to check.
   * @returns True if an instance of Shape, false if not.
   */
  public static isShape(shape: unknown): shape is Shape {
    return shape instanceof Shape;
  }
}

/**
 * Circles are defined by a center position and a radius.
 */
export class Circle extends Shape {
  /**
   * The center position of the circle.
   */
  public readonly position: Vector2D;
  /**
   * The radius of the circle.
   */
  public radius: number;

  /**
   * Sets components of the circle.
   * @param x The center X position of the circle.
   * @param y The center Y position of the circle.
   * @param radius The radius of the circle.
   */
  constructor(x: number, y: number, radius: number) {
    super();

    this.position = new Vector2D(x, y);
    this.radius = radius;
  }

  /**
   * The center X position of the circle.
   */
  public get x() {
    return this.position.x;
  }

  /**
   * The center Y position of the circle.
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
   * @param x The center x position of the circle.
   * @param y The center y position of the circle.
   * @param radius The radius of the circle.
   */
  public set(x: number, y: number, radius: number) {
    this.position.set(x, y);
    this.radius = radius;
  }

  /**
   * Checks if a point is contained within the circle.
   * @param point The point to check if it is contained in the circle.
   * @returns True if the point is contained within the circle, false if not.
   */
  public containsPoint(point: Vector2D) {
    const dx = this.position.x - point.x;
    const dy = this.position.y - point.y;

    return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(this.radius, 2);
  }

  /**
   * Checks if another shape overlaps with the circle.
   * @param shape The shape to check if it is overlapping with the circle.
   */
  public overlaps(shape: Shape) {
    switch (true) {
      case Circle.isCircle(shape):
        return this.overlapsCircle(shape);
      case Rectangle.isRectangle(shape):
        // TODO: Implement check.
        return false;
      default:
        return false;
    }
  }

  private overlapsCircle(circle: Circle) {
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

  public static isCircle(shape: Shape): shape is Circle {
    return shape instanceof Circle;
  }
}

/**
 * Rectangles are defined by a position and a size, where the position is the top-left corner of
 * the rectangle and X increases to the right and Y increases downwards.
 */
export class Rectangle extends Shape {
  /**
   * The top-left corner position of the rectangle.
   */
  public readonly position: Vector2D;
  /**
   * The dimensions of the rectangle.
   */
  public readonly size: Vector2D;

  /**
   * @param x The X position of the rectangle.
   * @param y The Y position of the rectangle.
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   */
  constructor(x: number, y: number, width: number, height: number) {
    super();

    this.position = new Vector2D(x, y);
    this.size = new Vector2D(width, height);
  }

  /**
   * The X position of the rectangle.
   */
  public get x() {
    return this.position.x;
  }

  /**
   * The Y position of the rectangle.
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
   * @param x The X position of the rectangle.
   * @param y The Y position of the rectangle.
   * @param width The width of the rectangle.
   * @param height The height of the rectangle.
   */
  public set(x: number, y: number, width: number, height: number) {
    this.position.set(x, y);
    this.size.set(width, height);
  }

  /**
   * Checks if a point is contained within the rectangle.
   * @param point The point to check.
   * @returns True if the point is contained within the rectangle, false if not.
   */
  public containsPoint(point: Vector2D) {
    return (
      point.x > this.left && point.x < this.right && point.y > this.top && point.y < this.bottom
    );
  }

  /**
   * Checks if another shape overlaps with the rectangle.
   * @param shape The shape to check if it is overlapping with the rectangle.
   */
  public overlaps(shape: Shape) {
    switch (true) {
      case Circle.isCircle(shape):
        // TODO: Implement check.
        return false;
      case Rectangle.isRectangle(shape):
        return this.overlapsRectangle(shape);
      default:
        return false;
    }
  }

  private overlapsRectangle(rectangle: Rectangle) {
    return (
      rectangle.left < this.right &&
      rectangle.right > this.left &&
      rectangle.top < this.bottom &&
      rectangle.bottom > this.top
    );
  }

  public static isRectangle(shape: Shape): shape is Rectangle {
    return shape instanceof Rectangle;
  }
}
