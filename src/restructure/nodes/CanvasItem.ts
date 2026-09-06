import type { Canvas } from '../providers/canvas.types';
import { BaseNode } from './BaseNode';

/**
 * Abstract base node for nodes which can be drawn onto a canvas.
 */
export abstract class CanvasItem extends BaseNode {
  /** A flag indicating if the node may be drawn or not. */
  public isVisible = true;
  /** The order in which this node is drawn. Nodes with higher z-indices are drawn on top of nodes with lower z-indices. */
  public zIndex = 0;

  /**
   * Draws the node onto a canvas.
   * @param canvas The canvas to draw onto.
   */
  public abstract draw(canvas: Canvas): void;
}
