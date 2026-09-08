import type { BaseNodeOptions } from './BaseNode';
import type { Canvas } from '../providers/canvas.types';
import { BaseNode } from './BaseNode';

export interface CanvasNodeOptions extends BaseNodeOptions {
  isVisible?: boolean;
  zIndex?: number;
}

/**
 * Abstract base node for nodes which can be drawn onto a canvas.
 */
export abstract class CanvasNode<T extends CanvasNodeOptions = CanvasNodeOptions> extends BaseNode<T> {
  /** A flag indicating if the node may be drawn or not. */
  public isVisible = true;
  /** The order in which this node is drawn. Nodes with higher z-indices are drawn on top of nodes with lower z-indices. */
  public zIndex = 0;

  constructor(id: string, options?: T) {
    super(id, options);

    if (options) {
      this.applyOptions(options);
    }
  }

  protected applyOptions(options: T) {
    super.applyOptions(options);

    if (options.isVisible !== undefined) {
      this.isVisible = options.isVisible;
    }

    if (options.zIndex !== undefined) {
      this.zIndex = options.zIndex;
    }
  }

  /**
   * Draws the node onto a canvas.
   * @param canvas The canvas to draw onto.
   */
  public abstract draw(canvas: Canvas): void;
}
