import type { DrawCommand } from '../../engine/graphics/graphics.types';
import { Event } from '../Event';

export class GraphicsEvents {
  public readonly ClearCanvas = new Event<void>();
  public readonly ClearDrawCommandQueue = new Event<void>();
  public readonly DeleteCachedDrawCommand = new Event<string>();
  public readonly ProcessDrawCommandQueue = new Event<void>();
  public readonly QueueDrawCommand = new Event<DrawCommand>();
}
