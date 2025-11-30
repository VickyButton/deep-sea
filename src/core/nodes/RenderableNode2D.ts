import { GameNode2D } from './GameNode2D';

export abstract class RenderableNode2D extends GameNode2D {
  /**
   * A flag for rendering the node. If false, the node should not be rendered.
   */
  public isVisible = true;

  /**
   * Renders an image bitmap for drawing.
   */
  public abstract render(): ImageBitmap;
}
