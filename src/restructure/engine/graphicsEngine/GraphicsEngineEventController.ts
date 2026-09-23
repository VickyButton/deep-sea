import type { DrawCommand, GraphicsEngine, GraphicsEngineEvents } from '../graphicsEngine.types';

/** Maps Graphics Engine events to their corresponding methods. */
export class GraphicsEngineEventController {
  private readonly engine: GraphicsEngine;
  private readonly events: GraphicsEngineEvents;

  constructor(engine: GraphicsEngine, events: GraphicsEngineEvents) {
    this.engine = engine;
    this.events = events;
  }

  public setup() {
    this.addEventListeners();
  }

  private addEventListeners() {
    this.addClearDrawCommandQueueEventListener();
    this.addDeleteCachedDrawCommandEventListener();
    this.addProcessDrawCommandQueueEventListener();
    this.addQueueDrawCommandEventListener();
  }

  private addClearDrawCommandQueueEventListener() {
    this.events.ClearDrawCommandQueue.addListener(this.onClearDrawCommandQueue);
  }

  private onClearDrawCommandQueue = () => {
    this.engine.clearDrawCommandQueue();
  };

  private addDeleteCachedDrawCommandEventListener() {
    this.events.DeleteCachedDrawCommand.addListener(this.onDeleteCachedDrawCommand);
  }

  private onDeleteCachedDrawCommand = (id: string) => {
    this.engine.deleteCachedDrawCommand(id);
  };

  private addProcessDrawCommandQueueEventListener() {
    this.events.ProcessDrawCommandQueue.addListener(this.onProcessDrawCommandQueue);
  }

  private onProcessDrawCommandQueue = () => {
    this.engine.processDrawCommandQueue();
  };

  private addQueueDrawCommandEventListener() {
    this.events.QueueDrawCommand.addListener(this.onQueueDrawCommand);
  }

  private onQueueDrawCommand = (command: DrawCommand) => {
    this.engine.queueDrawCommand(command);
  };

  public teardown() {
    this.removeEventListeners();
  }

  private removeEventListeners() {
    this.removeClearDrawCommandQueueEventListener();
    this.removeDeleteCachedDrawCommandEventListener();
    this.removeProcessDrawCommandQueueEventListener();
    this.removeQueueDrawCommandEventListener();
  }

  private removeClearDrawCommandQueueEventListener() {
    this.events.ClearDrawCommandQueue.removeListener(this.onClearDrawCommandQueue);
  }

  private removeDeleteCachedDrawCommandEventListener() {
    this.events.DeleteCachedDrawCommand.removeListener(this.onDeleteCachedDrawCommand);
  }

  private removeProcessDrawCommandQueueEventListener() {
    this.events.ProcessDrawCommandQueue.removeListener(this.onProcessDrawCommandQueue);
  }

  private removeQueueDrawCommandEventListener() {
    this.events.QueueDrawCommand.removeListener(this.onQueueDrawCommand);
  }
}
