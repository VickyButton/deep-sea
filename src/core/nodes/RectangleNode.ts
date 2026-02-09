import { Rectangle } from '@core/structures/Shapes';
import { Vector2D } from '@core/structures/Vector2D';
import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { getConfig } from 'config';
import { ShapeNode2D } from './ShapeNode2D';

export class RectangleNode extends ShapeNode2D {
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
  public get shape() {
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
   * Checks if a given node is an instance of RectangleNode.
   * @param node The node to check.
   * @returns True if an instance of RectangleNode, false if not.
   */
  public static isRectangleNode(node: unknown): node is RectangleNode {
    return node instanceof RectangleNode;
  }

  public render() {
    const config = getConfig();
    const size = Vector2D.multiply(this.globalScale, this.size);
    const canvas = new OffscreenCanvas(size.x, size.y);
    const ctx = getCanvasContext2D(canvas);

    if (config.dev.debugMode) {
      ctx.strokeStyle = this.debugOutlineColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(0, 0, size.x, size.y);
    }

    return canvas.transferToImageBitmap();
  }
}
