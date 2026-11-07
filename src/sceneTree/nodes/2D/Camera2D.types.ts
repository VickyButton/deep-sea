import type { Node2DOptions } from './Node2D.types';

/** Options for instantiating a CanvasNode. */
export interface Camera2DOptions extends Node2DOptions {
  /** The camera's zoom level. */
  zoom?: number;
}
