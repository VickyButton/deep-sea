import type { Node_Options } from './Node';
import type { GraphicsCanvas } from '../providers/graphicsCanvas.types';
import { Node } from './Node';
import { graphicsEngineEvents } from '../engine/graphicsEngine/GraphicEngineEvents';

/**
 * Abstract base node for nodes which can be drawn onto a graphics canvas.
 */
export abstract class GraphicsNode extends Node {
  /** A flag indicating if the node may be drawn or not. */
  public isVisible: boolean;
  /** The order in which this node is drawn. Nodes with higher z-indices are drawn on top of nodes with lower z-indices. */
  public zIndex: number;

  constructor(id: string, options?: GraphicsNode_Options) {
    super(id, options);

    this.isVisible = options?.isVisible ?? true;
    this.zIndex = options?.zIndex ?? 0;
  }

  /**
   * Draws the node onto a canvas.
   * @param canvas The canvas to draw onto.
   */
  public abstract draw(canvas: GraphicsCanvas): void;

  /**
   * Begins a new drawing path on the canvas.
   * @param canvas The canvas to draw onto.
   */
  protected beginDrawingPath(canvas: GraphicsCanvas) {
    canvas.beginPath();
  }

  /**
   * Closes the current drawing path on the canvas.
   * @param canvas The canvas to draw onto.
   */
  protected closeDrawingPath(canvas: GraphicsCanvas) {
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
      draw: (canvas: GraphicsCanvas) => this.draw(canvas),
      zIndex: this.zIndex,
    };
  }
}

export interface GraphicsNode_Options extends Node_Options {
  isVisible?: boolean;
  zIndex?: number;
}
