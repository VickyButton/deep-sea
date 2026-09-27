import type { DrawCommand } from '../../engine/graphics/graphics.types';
import type { Event } from '../Event';

/** Graphics events. */
export interface GraphicsEvents {
  /** Event for clearing the canvas. */
  ClearCanvas: Event<void>;
  /** Event for clearing the draw command queue. */
  ClearDrawCommandQueue: Event<void>;
  /** Event for deleting a cached draw command. */
  DeleteCachedDrawCommand: Event<string>;
  /** Event for processing the draw command queue. */
  ProcessDrawCommandQueue: Event<void>;
  /** Event for queueing a draw command. */
  QueueDrawCommand: Event<DrawCommand>;
}
