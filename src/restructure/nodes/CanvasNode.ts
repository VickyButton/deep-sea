import type { Node_Options } from './Node';
import type { Canvas } from '../domain/canvases/Canvas';
import { Node } from './Node';
import { graphicsEngineEvents } from '../engine/graphicsEngine/graphicEngineEvents';

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

  /**
   * Begins a new drawing path on a canvas.
   * @param canvas The canvas to draw onto.
   */
  protected beginDrawingPath(canvas: Canvas) {
    canvas.beginPath();
  }

  /**
   * Closes the current drawing path on a canvas.
   * @param canvas The canvas to draw onto.
   */
  protected closeDrawingPath(canvas: Canvas) {
    canvas.closePath();
  }

  /** Queues a redraw for the node. */
  protected queueRedraw() {
    graphicsEngineEvents.QueueDrawCommand.emit(this.createDrawCommand());
  }

  /** Creates a draw command for the node. */
  protected createDrawCommand() {
    return {
      id: this.id,
      zIndex: this.zIndex,
      draw: (canvas: Canvas) => this.draw(canvas),
    };
  }

  public teardown() {
    this.deleteCachedDrawCommand();

    super.teardown();
  }

  private deleteCachedDrawCommand() {
    graphicsEngineEvents.DeleteCachedDrawCommand.emit(this.id);
  }
}

export interface CanvasNode_Options extends Node_Options {
  isVisible?: boolean;
  zIndex?: number;
}
