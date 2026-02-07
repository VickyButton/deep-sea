import { Rectangle } from '@core/structures/Rectangle';
import { getGame } from 'game';
import { GameNode2D } from './GameNode2D';

export abstract class GraphicsNode2D extends GameNode2D {
  /**
   * A flag for rendering the node. If false, the node should not be rendered.
   */
  public visible = true;
  /**
   * The layer on which the node should be rendered on.
   */
  public layer = 0;

  /**
   * The visibility relative to the global scope.
   */
  public get globalVisible() {
    this.traverseToRoot((node) => {
      if (node instanceof GraphicsNode2D && !node.visible) return false;
    });

    return this.visible;
  }

  /**
   * The layer relative to the global space.
   */
  public get globalLayer() {
    let layer = this.layer;

    this.traverseToRoot((node) => {
      if (node instanceof GraphicsNode2D) layer += node.layer;
    });

    return layer;
  }

  /**
   * The bounding rectangle of the node, relative to the global space.
   */
  public abstract get boundingBox(): Rectangle;

  public setup() {
    super.setup();

    const game = getGame();

    game.graphics.registerNode(this);
  }

  public teardown() {
    super.teardown();

    const game = getGame();

    game.graphics.deregisterNode(this);
  }

  /**
   * Renders an image bitmap for drawing.
   */
  public abstract render(): ImageBitmap;
}
