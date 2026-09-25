import type { FrameLoop, FrameLoopEvents } from './frameLoop.types';
import { EventController } from '../../events/EventController';

/** Maps Frame Loop events to their corresponding methods. */
export class FrameLoopEventController extends EventController {
  constructor(loop: FrameLoop, events: FrameLoopEvents) {
    super();

    this.assignListeners(loop, events);
  }

  private assignListeners(loop: FrameLoop, events: FrameLoopEvents) {
    this.on(events.SetFramesPerSecond, loop.setFramesPerSecond.bind(loop));
    this.on(events.SetLoopCallback, loop.setLoopCallback.bind(loop));
    this.on(events.Start, loop.start.bind(loop));
    this.on(events.Stop, loop.stop.bind(loop));
  }
}
