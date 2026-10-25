import type { DrawInstructionsBuilder } from '../../domain/drawInstructions/builder/DrawInstructionsBuilder';
import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import type { Signal } from '../../domain/signal/Signal';
import type { Node } from '../node/Node';

/** A node that can be drawn onto a canvas. */
export interface CanvasNode extends Node {
  /** Emitted after a redraw has been requested for the node. The draw instructions are passed to callbacks. */
  readonly redraw_requested: Signal<DrawInstructions>;
  /** Emitted after the node's visibility has been changed. The new visibility is passed to callbacks. */
  readonly visibility_changed: Signal<boolean>;
  /** Emitted after the node's z-index has been changed. The new z-index is passed to callbacks. */
  readonly z_index_changed: Signal<number>;
  /** The node's visibility. True means the node is visible, false means the node is hidden. */
  visible: boolean;
  /** The z-index to which the node belongs to. A node with a lower z-index will be drawn before a node with a higher z-index. */
  zIndex: number;
  /** The node's global visibility. Is true when the node and its ancestors are visible. */
  get globalVisible(): boolean;
  /** The node's global z-index. */
  get globalZIndex(): number;
  /** Turns off the node's visibility. Hidden nodes cannot be drawn. */
  hide(): void;
  /** Requests a redraw for the next frame. */
  requestRedraw(): void;
  /** Sets the callback to execute when building the node's draw instructions. */
  setDrawCallback(callback: DrawCallback): void;
  /** Turns on the node's visibility. Visible nodes can be drawn. */
  show(): void;
}

export type DrawCallback = (builder: DrawInstructionsBuilder) => void;
