import type { Node_Options } from './Node';
import type { Canvas } from '../providers/canvas.types';
import { Node } from './Node';

/**
 * Abstract base node for nodes which can be drawn onto a canvas.
 */
export abstract class CanvasNode extends Node {
  /** A flag indicating if the node may be drawn or not. */
  public isVisible: boolean;
  /** The order in which this node is drawn. Nodes with higher z-indices are drawn on top of nodes with lower z-indices. */
  public zIndex: number;

  constructor(id: string, options?: CanvasNode_Options) {
    super(id, options);

    this.isVisible = options?.isVisible ?? true;
    this.zIndex = options?.zIndex ?? 0;
  }

  /**
   * Draws the node onto a canvas.
   * @param canvas The canvas to draw onto.
   */
  public abstract draw(canvas: Canvas): void;
}

export interface CanvasNode_Options extends Node_Options {
  isVisible?: boolean;
  zIndex?: number;
}
