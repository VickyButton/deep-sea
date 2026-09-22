import type { GraphicsEngineEvents } from '../graphicsEngine.types';
import { Event } from '../../events/Event';

export const graphicsEngineEvents: GraphicsEngineEvents = {
  SetTargetCanvas: new Event(),
  QueueDrawCommand: new Event(),
  ProcessDrawCommandQueue: new Event(),
  DeleteCachedDrawCommand: new Event(),
};
