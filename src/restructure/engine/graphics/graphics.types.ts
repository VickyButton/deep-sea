import type { Canvas } from '../../domain/canvases/Canvas';

/** Exposes functionality for drawing graphics onto a canvas through draw commands. */
export interface Graphics {
  /** Clears the canvas. */
  clearCanvas(): void;
  /** Clears the draw command queue. */
  clearDrawCommandQueue(): void;
  /**
   * Deletes a cached draw command.
   * @param id The command's unique identifier.
   */
  deleteCachedDrawCommand(id: string): void;
  /** Processes the draw command queue, executing each draw command. */
  processDrawCommandQueue(): void;
  /**
   * Queues a draw command for drawing onto the canvas.
   * @param command The draw command to add to the queue.
   */
  queueDrawCommand(command: DrawCommand): void;
}

/** A command for drawing onto a graphics canvas. */
export interface DrawCommand {
  /** The unique identifier for the draw command. */
  id: string;
  /** The order in which the command should be executed, with smaller z-indices being drawn first. */
  zIndex: number;
  /** The function for drawing onto the canvas. */
  draw: (canvas: Canvas) => void;
}
