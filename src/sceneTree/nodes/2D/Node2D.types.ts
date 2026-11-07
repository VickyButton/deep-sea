import type { CanvasNodeOptions } from '../main/CanvasNode.types';

/** Options for instantiating a Node2D. */
export interface Node2DOptions extends CanvasNodeOptions {
  positionX?: number;
  positionY?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
}
