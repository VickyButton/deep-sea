import type { NodeOptions } from './Node.types';

/** Options for instantiating a CanvasNode. */
export interface CanvasNodeOptions extends NodeOptions {
  /** The node's local visibility. */
  visible?: boolean;
  /** The node's local z-index. */
  zIndex?: number;
}
