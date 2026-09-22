import type { GraphicsCanvas } from '../../providers/graphicsCanvas.types';
import type { DrawCommand, GraphicsEngine, GraphicsEngineEvents } from '../graphicsEngine.types';

/**
 * Maps Graphics Engine events to their corresponding methods.
 */
export class GraphicsEngineEventController {
  private readonly graphicsEngine: GraphicsEngine;
  private readonly events: GraphicsEngineEvents;

  constructor(graphicsEngine: GraphicsEngine, events: GraphicsEngineEvents) {
    this.graphicsEngine = graphicsEngine;
    this.events = events;
  }

  public setup() {
    this.addEventListeners();
  }

  private addEventListeners() {
    this.addSetTargetCanvasEventListener();
    this.addQueueDrawCommandEventListener();
    this.addProcessDrawCommandQueueEventListener();
    this.addDeleteCachedDrawCommandEventListener();
  }

  private addSetTargetCanvasEventListener() {
    this.events.SetTargetCanvas.addListener(this.onSetTargetCanvas);
  }

  private onSetTargetCanvas = (canvas: GraphicsCanvas | null) => {
    this.graphicsEngine.setTargetCanvas(canvas);
  };

  private addQueueDrawCommandEventListener() {
    this.events.QueueDrawCommand.addListener(this.onQueueDrawCommand);
  }

  private onQueueDrawCommand = (command: DrawCommand) => {
    this.graphicsEngine.queueDrawCommand(command);
  };

  private addProcessDrawCommandQueueEventListener() {
    this.events.ProcessDrawCommandQueue.addListener(this.onProcessDrawCommandQueue);
  }

  private onProcessDrawCommandQueue = () => {
    this.graphicsEngine.processDrawCommandQueue();
  };

  private addDeleteCachedDrawCommandEventListener() {
    this.events.DeleteCachedDrawCommand.addListener(this.onDeleteCachedDrawCommand);
  }

  private onDeleteCachedDrawCommand = (id: string) => {
    this.graphicsEngine.deleteCachedDrawCommand(id);
  };

  public teardown() {
    this.removeEventListeners();
  }

  private removeEventListeners() {
    this.removeSetTargetCanvasEventListener();
    this.removeQueueDrawCommandEventListener();
    this.removeProcessDrawCommandQueueEventListener();
    this.removeDeleteCachedDrawCommandEventListener();
  }

  private removeSetTargetCanvasEventListener() {
    this.events.SetTargetCanvas.removeListener(this.onSetTargetCanvas);
  }

  private removeQueueDrawCommandEventListener() {
    this.events.QueueDrawCommand.removeListener(this.onQueueDrawCommand);
  }

  private removeProcessDrawCommandQueueEventListener() {
    this.events.ProcessDrawCommandQueue.removeListener(this.onProcessDrawCommandQueue);
  }

  private removeDeleteCachedDrawCommandEventListener() {
    this.events.DeleteCachedDrawCommand.removeListener(this.onDeleteCachedDrawCommand);
  }
}
