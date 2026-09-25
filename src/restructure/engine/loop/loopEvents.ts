import type { LoopEvents } from './loop.types';
import { Event } from '../../events';

export const loopEvents: LoopEvents = {
  SetLoopCallback: new Event(),
  SetLoopsPerSecond: new Event(),
  Start: new Event(),
  Stop: new Event(),
};
