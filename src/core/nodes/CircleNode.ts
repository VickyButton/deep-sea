import { ColorRGB } from '@structures/Colors';
import { Circle, Rectangle } from '@structures/Shapes';
import { Vector2D } from '@structures/Vector2D';
import { useConfig } from 'config';
import { useGraphics } from 'graphics';
import { useRenderer } from 'renderer';
import { ShapeNode2D } from './ShapeNode2D';

export class CircleNode extends ShapeNode2D {
  /**
   * The circle outline color for when debug mode is enabled.
   */
  public debugOutlineColor = ColorRGB.red;

  /**
   * The radius of the circle.
   */
  public radius = 1;

  public get boundingBox() {
    const size = Vector2D.multiply(this.globalScale, new Vector2D(this.diameter, this.diameter));
    const position = Vector2D.subtract(
      this.globalPosition,
      Vector2D.multiply(size, new Vector2D(0.5, 0.5)),
    );

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

  public draw() {
    const config = useConfig();
    const graphics = useGraphics();
    const renderer = useRenderer();
    const position = renderer.getActiveCamera().calculateRelativePosition(this.globalPosition);
    const radius = this.shape.radius;

    graphics.drawCircle(position.x, position.y, radius);

    if (config.dev.debugMode) {
      graphics.stroke(this.debugOutlineColor.toRgbString());
    }
  }

  public static create(x: number, y: number, radius: number) {
    const node = new CircleNode();

    node.position.set(x, y);
    node.radius = radius;

    return node;
  }
}
