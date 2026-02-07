import { Shape } from '@core/structures/Shapes';
import { GraphicsNode2D } from './GraphicsNode2D';

export abstract class ShapeNode2D extends GraphicsNode2D {
  public abstract readonly shape: Shape;

  /**
   * Checks if a given node is an instance of ShapeNode2D.
   * @param node The node to check.
   * @returns True if an instance of ShapeNode2D, false if not.
   */
  public static isShapeNode2D(node: unknown): node is ShapeNode2D {
    return node instanceof ShapeNode2D;
  }
}
