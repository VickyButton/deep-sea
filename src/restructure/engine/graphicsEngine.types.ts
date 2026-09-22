import type { Event } from '../events';
import type { GraphicsCanvas } from '../providers/graphicsCanvas.types';

/** Exposes functionality for drawing graphics onto a canvas through draw commands. */
export interface GraphicsEngine {
  /**
   * Deletes a cached draw command.
   * @param id The command's unique identifier.
   */
  deleteCachedDrawCommand(id: string): void;
  /** Processes the draw command queue, executing each draw command. */
  processDrawCommandQueue(): void;
  /**
   * Queues a draw command for drawing onto the target canvas.
   * @param command The draw command to add to the queue.
   */
  queueDrawCommand(command: DrawCommand): void;
}

/** Graphics Engine events. */
export interface GraphicsEngineEvents {
  /** Event for deleting a cached draw command. */
  DeleteCachedDrawCommand: Event<string>;
  /** Event for processing the draw command queue. */
  ProcessDrawCommandQueue: Event<void>;
  /** Event for queueing a draw command. */
  QueueDrawCommand: Event<DrawCommand>;
}

/** A command for drawing onto a graphics canvas. */
export interface DrawCommand {
  /** The unique identifier for the draw command. */
  id: string;
  /** The order in which the command should be executed, with smaller z-indices being drawn first. */
  zIndex: number;
  /** The function for drawing onto the canvas. */
  draw: (canvas: GraphicsCanvas) => void;
}
