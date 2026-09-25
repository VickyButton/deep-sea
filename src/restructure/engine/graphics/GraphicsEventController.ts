import type { Graphics, GraphicsEvents } from './graphics.types';
import { EventController } from '../../events/EventController';

/** Maps Graphics Engine events to their corresponding methods. */
export class GraphicsEventController extends EventController {
  constructor(graphics: Graphics, events: GraphicsEvents) {
    super();

    this.assignListeners(graphics, events);
  }

  private assignListeners(graphics: Graphics, events: GraphicsEvents) {
    this.on(events.ClearCanvas, graphics.clearCanvas.bind(graphics));
    this.on(events.ClearDrawCommandQueue, graphics.clearDrawCommandQueue.bind(graphics));
    this.on(events.DeleteCachedDrawCommand, graphics.deleteCachedDrawCommand.bind(graphics));
    this.on(events.ProcessDrawCommandQueue, graphics.processDrawCommandQueue.bind(graphics));
    this.on(events.QueueDrawCommand, graphics.queueDrawCommand.bind(graphics));
  }
}
