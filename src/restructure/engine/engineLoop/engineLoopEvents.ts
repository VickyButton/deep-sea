import type { EngineLoopEvents } from './engineLoop.types';
import { Event } from '../../events';

export const engineLoopEvents: EngineLoopEvents = {
  SetFramesPerSecond: new Event(),
  SetLoopCallback: new Event(),
  Start: new Event(),
  Stop: new Event(),
};
