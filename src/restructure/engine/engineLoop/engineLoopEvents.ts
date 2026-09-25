import type { FrameLoopEvents } from './engineLoop.types';
import { Event } from '../../events';

export const frameLoopEvents: FrameLoopEvents = {
  SetFramesPerSecond: new Event(),
  SetLoopCallback: new Event(),
  Start: new Event(),
  Stop: new Event(),
};
