import { Rectangle } from '@core/structures/Rectangle';
import { Vector2D } from '@core/structures/Vector2D';
import { game } from 'game';
import { Shape2D } from './Shape2D';

export class Rectangle2D extends Shape2D {
  /**
   * The rectangle outline color for when debug mode is enabled.
   */
  public debugOutlineColor = 'red';

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

  public get boundingBox() {
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

  public render() {
    const canvas = new OffscreenCanvas(this.size.x, this.size.y);
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Unable to get rendering context');

    if (game.debugMode) {
      context.strokeStyle = this.debugOutlineColor;
      context.lineWidth = 1.5;
      context.strokeRect(0, 0, this.size.x, this.size.y);
    }

    return canvas.transferToImageBitmap();
  }
}
