import type { GraphicsEngineEvents } from '../graphicsEngine.types';
import { Event } from '../../events/Event';

export const graphicsEngineEvents: GraphicsEngineEvents = {
  QueueDrawCommandEvent: new Event(),
  DeleteCachedDrawCommandEvent: new Event(),
};
