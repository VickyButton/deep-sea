import type { DrawCommand } from '../../engine/graphics/graphics.types';
import { Event } from '../Event';

/** Events for the Graphics component. */
export class GraphicsEvents {
  /** Event for clearing the canvas. */
  public readonly ClearCanvas = new Event<void>();
  /** Event for clearing the draw command queue. */
  public readonly ClearDrawCommandQueue = new Event<void>();
  /** Event for deleting a cached draw command. */
  public readonly DeleteCachedDrawCommand = new Event<string>();
  /** Event for prcoessing the draw command queue. */
  public readonly ProcessDrawCommandQueue = new Event<void>();
  /** Event for queueing a draw command. */
  public readonly QueueDrawCommand = new Event<DrawCommand>();
}
