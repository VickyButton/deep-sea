import type { GraphicsEngineEvents } from '../graphicsEngine.types';
import { Event } from '../../events/Event';

export const graphicsEngineEvents: GraphicsEngineEvents = {
  QueueDrawCommand: new Event(),
  DeleteCachedDrawCommand: new Event(),
};
