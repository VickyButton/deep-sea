import { Circle, Rectangle } from '@core/structures/Shapes';
import { Vector2D } from '@core/structures/Vector2D';
import { getCanvasContext2D } from '@core/utils/getCanvasContext';
import { getConfig } from 'config';
import { ShapeNode2D } from './ShapeNode2D';

export class CircleNode extends ShapeNode2D {
  /**
   * The circle outline color for when debug mode is enabled.
   */
  public debugOutlineColor = 'red';

  /**
   * The radius of the circle.
   */
  public radius = 1;

  public get boundingBox() {
    const position = this.globalPosition;
    const size = Vector2D.multiply(this.globalScale, new Vector2D(this.diameter, this.diameter));

    return new Rectangle(position.x, position.y, size.x, size.y);
  }

  /**
   * The bounding circle formed by the node.
   */
  public get shape() {
    const position = this.globalPosition;
    const radius = Math.min(this.globalScale.x, this.globalScale.y) * this.radius;

    return new Circle(position.x, position.y, radius);
  }

  /**
   * The diameter of the circle.
   */
  public get diameter() {
    return 2 * this.radius;
  }

  /**
   * Checks if a given node is an instance of CircleNode.
   * @param node The node to check.
   * @returns True if an instance of CircleNode, false if not.
   */
  public static isCircleNode(node: unknown): node is CircleNode {
    return node instanceof CircleNode;
  }

  public render() {
    const config = getConfig();
    const size = Vector2D.multiply(this.globalScale, new Vector2D(this.diameter, this.diameter));
    const radius = size.x / 2;
    const canvas = new OffscreenCanvas(size.x, size.y);
    const ctx = getCanvasContext2D(canvas);

    if (config.dev.debugMode) {
      ctx.strokeStyle = this.debugOutlineColor;
      ctx.arc(radius, radius, radius - 0.5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    return canvas.transferToImageBitmap();
  }
}
