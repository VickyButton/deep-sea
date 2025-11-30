import { Vector2D } from '@core/structures/Vector2D';
import { GameNode2D } from './GameNode2D';

export abstract class RenderableNode2D extends GameNode2D {
  /**
   * A flag for rendering the node. If false, the node should not be rendered.
   */
  public visible = true;
  /**
   * The layer on which the node should be rendered on.
   */
  public zIndex = 0;
  /**
   * The pre-scale size of the node.
   */
  public abstract size: Vector2D;

  /**
   * Renders an image bitmap for drawing.
   */
  public abstract render(): ImageBitmap;
}
