import type { NodeEvents } from './Node';
import type { Canvas } from '../domain/canvases/Canvas';
import type { GraphicsEvents } from '../events/graphics/GraphicsEvents';
import { Node } from './Node';

/** Abstract base node for nodes which can be drawn onto a canvas. */
export abstract class CanvasNode<Events extends CanvasNodeEvents = CanvasNodeEvents> extends Node<Events> {
  // TODO: Add flag for indicating if node should redraw next frame.
  /** A flag indicating if the node may be drawn or not. */
  public isVisible = true;
  /** The order in which this node is drawn. Nodes with higher z-indices are drawn on top of nodes with lower z-indices. */
  public zIndex = 0;

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
    this.events.graphics.QueueDrawCommand.emit(this.createDrawCommand());
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
    this.events.graphics.DeleteCachedDrawCommand.emit(this.id);
  }
}

export interface CanvasNodeEvents extends NodeEvents {
  graphics: GraphicsEvents;
}
