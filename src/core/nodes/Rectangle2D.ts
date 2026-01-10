import { Rectangle } from '@core/structures/Rectangle';
import { Vector2D } from '@core/structures/Vector2D';
import { Shape2D } from './Shape2D';

export class Rectangle2D extends Shape2D {
  /**
   * The dimensions of the rectangle.
   */
  public size = Vector2D.one;

  /**
   * The bounding rectangle formed by the node.
   */
  public get rectangle() {
    const position = this.globalPosition;
    const size = Vector2D.multiply(this.globalScale, this.size);

    return new Rectangle(position.x, position.y, size.x, size.y);
  }

  /**
   * Checks if a given node is an instance of Rectangle2D.
   * @param node The node to check.
   * @returns True if an instance of Rectangle2D, false if not.
   */
  public static isRectangle2D(node: unknown): node is Rectangle2D {
    return node instanceof Rectangle2D;
  }
}
