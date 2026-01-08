import { Vector2D } from './Vector2D';

export class Circle {
  public readonly position: Vector2D;
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
  public contains(point: Vector2D) {
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
