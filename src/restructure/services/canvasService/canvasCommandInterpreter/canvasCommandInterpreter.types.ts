import type { Canvas } from './canvas/Canvas';

/** A callback that takes a canvas as an argument. */
export type CanvasCallback = (canvas: Canvas) => void;

/** A command that can be executed on a canvas. */
export interface CanvasCommand {
  /** The command type. */
  type: string;
}
