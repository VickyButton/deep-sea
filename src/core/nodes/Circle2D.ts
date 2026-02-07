import { Circle } from '@core/structures/Circle';
import { Rectangle } from '@core/structures/Rectangle';
import { Vector2D } from '@core/structures/Vector2D';
import { getConfig } from 'config';
import { Shape2D } from './Shape2D';

export class Circle2D extends Shape2D {
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
  public get circle() {
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
   * Checks if a given node is an instance of Circle2D.
   * @param node The node to check.
   * @returns True if an instance of Circle2D, false if not.
   */
  public static isCircle2D(node: unknown): node is Circle2D {
    return node instanceof Circle2D;
  }

  public render() {
    const config = getConfig();
    const size = Vector2D.multiply(this.globalScale, new Vector2D(this.diameter, this.diameter));
    const radius = size.x / 2;
    const canvas = new OffscreenCanvas(size.x, size.y);
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Unable to get rendering context');

    if (config.dev.debugMode) {
      context.strokeStyle = this.debugOutlineColor;
      context.arc(radius, radius, radius - 0.5, 0, 2 * Math.PI);
      context.stroke();
    }

    return canvas.transferToImageBitmap();
  }
}
