import type { FrameLoopEvents } from './frameLoop.types';
import { Event } from '../../events';

export const frameLoopEvents: FrameLoopEvents = {
  SetFramesPerSecond: new Event(),
  SetLoopCallback: new Event(),
  Start: new Event(),
  Stop: new Event(),
};
