import type { Canvas } from '../../domain/canvas/canvas.types';

/** Exposes functionality for rendering frames through draw commands. */
export interface Graphics {
  /**
   * Caches a command, allowing it to execute each render until it is deleted.
   * @command The command to cache.
   */
  cacheCommand(command: DrawCommand): void;
  /** Clears the draw command queue. */
  clearQueue(): void;
  /**
   * Deletes a cached draw command.
   * @param id The command's unique identifier.
   */
  deleteCommand(id: string): void;
  /**
   * Queues a draw command for the next frame.
   * @param command The draw command to add to the queue.
   */
  queueCommand(command: DrawCommand): void;
  /**
   * Renders a new frame by executing queued draw commands.
   * @returns The rendered frame as an image bitmap.
   */
  render(): ImageBitmap;
}

/** A command for drawing onto a graphics canvas. */
export interface DrawCommand {
  /** The unique identifier for the command. */
  id: string;
  /** The order in which the command should be executed, with smaller z-indices being drawn first. */
  zIndex: number;
  /** The function for drawing onto the canvas. */
  draw: (canvas: Canvas) => void;
}
