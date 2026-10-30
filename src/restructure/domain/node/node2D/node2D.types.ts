import type { CanvasNodeOptions } from '../canvasNode/canvasNode.types';

export interface Node2DOptions extends CanvasNodeOptions {
  scaleX: number;
  scaleY: number;
  rotation: number;
  positionX: number;
  positionY: number;
}
