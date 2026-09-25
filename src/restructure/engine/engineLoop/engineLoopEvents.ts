import type { EngineLoopEvents } from './engineLoop.types';
import { Event } from '../../events';

export const engineLoopEvents: EngineLoopEvents = {
  SetLoopCallback: new Event(),
  SetLoopsPerSecond: new Event(),
  Start: new Event(),
  Stop: new Event(),
};
