import type { Loop, LoopEvents } from './loop.types';
import { EventController } from '../../events/EventController';

/** Maps Engine Loop events to their corresponding methods. */
export class LoopEventController extends EventController {
  constructor(loop: Loop, events: LoopEvents) {
    super();

    this.assignListeners(loop, events);
  }

  private assignListeners(loop: Loop, events: LoopEvents) {
    this.on(events.SetLoopCallback, loop.setLoopCallback.bind(loop));
    this.on(events.SetLoopsPerSecond, loop.setLoopsPerSecond.bind(loop));
    this.on(events.Start, loop.start.bind(loop));
    this.on(events.Stop, loop.stop.bind(loop));
  }
}
