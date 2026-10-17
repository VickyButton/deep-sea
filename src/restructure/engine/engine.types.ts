import type { NodeConstructor } from '../nodes/node/node.types';

/** Coordinates interactions between engine components. */
export interface Engine {
  /** Whether or not the engine is listening for signals. */
  get isActive(): boolean;
  /** Replaces the current scene in the scene tree. */
  replaceScene(scene: NodeConstructor): void;
  /** Sets the callback to execute when a new frame is ready. */
  setNewFrameCallback(callback: NewFrameCallback): void;
  /** Starts the engine. */
  start(): void;
  /** Stops the engine. */
  stop(): void;
}

export type NewFrameCallback = (frame: ImageBitmap) => void;
