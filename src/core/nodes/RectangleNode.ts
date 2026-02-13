import { getGraphics } from '@core/engine/graphics';
import { ColorRGB } from '@core/structures/Colors';
import { Rectangle } from '@core/structures/Shapes';
import { Vector2D } from '@core/structures/Vector2D';
import { getConfig } from 'config';
import { ShapeNode2D } from './ShapeNode2D';

export class RectangleNode extends ShapeNode2D {
  /**
   * The rectangle outline color for when debug mode is enabled.
   */
  public debugOutlineColor = ColorRGB.red;

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

  public draw() {
    const config = getConfig();
    const graphics = getGraphics();
    const position = this.shape.position;
    const size = this.shape.size;

    graphics.drawRectangle(position.x, position.y, size.x, size.y);

    if (config.dev.debugMode) {
      graphics.stroke(this.debugOutlineColor.toRgbString());
    }
  }

  /**
   * Checks if a given node is an instance of RectangleNode.
   * @param node The node to check.
   * @returns True if an instance of RectangleNode, false if not.
   */
  public static isRectangleNode(node: unknown): node is RectangleNode {
    return node instanceof RectangleNode;
  }

  public static create(x: number, y: number, width: number, height: number) {
    const node = new RectangleNode();

    node.position = new Vector2D(x, y);
    node.size = new Vector2D(width, height);

    return node;
  }
}
