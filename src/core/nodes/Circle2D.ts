import { Circle } from '@core/structures/Circle';
import { Shape2D } from './Shape2D';

export class Circle2D extends Shape2D {
  /**
   * The radius of the circle.
   */
  public radius = 1;

  /**
   * The bounding circle formed by the node.
   */
  public get circle() {
    const position = this.globalPosition;
    const radius = Math.min(this.globalScale.x, this.globalScale.y) * this.radius;

    return new Circle(position.x, position.y, radius);
  }

  public get diameter() {
    return 2 * this.radius;
  }

  /**
   * Checks if a given node is an instance of Circle2D.
   * @param node The node to check.
   * @returns True if an instance of Circle2D, false if not.
   */
  public static isCircle2D(node: unknown): node is Circle2D {
    return node instanceof Circle2D;
  }
}
