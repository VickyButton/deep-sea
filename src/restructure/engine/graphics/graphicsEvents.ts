import type { GraphicsEvents } from './graphics.types';
import { Event } from '../../events/Event';

export const graphicsEvents: GraphicsEvents = {
  ClearCanvas: new Event(),
  ClearDrawCommandQueue: new Event(),
  DeleteCachedDrawCommand: new Event(),
  ProcessDrawCommandQueue: new Event(),
  QueueDrawCommand: new Event(),
};
