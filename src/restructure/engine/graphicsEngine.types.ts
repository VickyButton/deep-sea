import type { Event } from '../events';
import type { GraphicsCanvas } from '../providers/graphicsCanvas.types';

/**
 * Manages the target graphics canvas and exposes functionality for drawing to said canvas.
 */
export interface GraphicsEngine {
  /**
   * Sets the target graphics canvas to draw to.
   * @param canvas The target canvas to draw to.
   */
  setTargetCanvas(canvas: GraphicsCanvas | null): void;
  /**
   * Queues a draw command for drawing onto the target canvas.
   * @param command The draw command to add to the queue.
   */
  queueDrawCommand(command: DrawCommand): void;
  /** Processes the draw command queue, executing each draw command. */
  processDrawCommandQueue(): void;
  /**
   * Deletes a cached draw command.
   * @param id The command's unique identifier.
   */
  deleteCachedDrawCommand(id: string): void;
}

/** A command for drawing onto a graphics canvas. */
export interface DrawCommand {
  /** The unique identifier for the draw command. */
  id: string;
  /** The function for drawing onto the canvas. */
  draw: (canvas: GraphicsCanvas) => void;
  /** The order in which the command should be executed, with smaller z-indices being drawn first. */
  zIndex: number;
}

/**
 * Events specific to the Graphics Engine.
 */
export interface GraphicsEngineEvents {
  /** Event for queueing a draw command. */
  QueueDrawCommand: Event<DrawCommand>;
  /** Event for deleting a cached draw command. */
  DeleteCachedDrawCommand: Event<string>;
}
