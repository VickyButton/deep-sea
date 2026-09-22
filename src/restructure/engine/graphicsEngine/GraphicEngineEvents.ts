import type { GraphicsEngineEvents } from '../graphicsEngine.types';
import { Event } from '../../events/Event';

export const graphicsEngineEvents: GraphicsEngineEvents = {
  DeleteCachedDrawCommand: new Event(),
  ProcessDrawCommandQueue: new Event(),
  QueueDrawCommand: new Event(),
  SetTargetCanvas: new Event(),
};
