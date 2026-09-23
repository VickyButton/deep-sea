import type { GraphicsEngineEvents } from './graphicsEngine.types';
import { Event } from '../../events/Event';

export const graphicsEngineEvents: GraphicsEngineEvents = {
  ClearCanvas: new Event(),
  ClearDrawCommandQueue: new Event(),
  DeleteCachedDrawCommand: new Event(),
  ProcessDrawCommandQueue: new Event(),
  QueueDrawCommand: new Event(),
};
