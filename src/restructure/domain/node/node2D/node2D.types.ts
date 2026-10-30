import type { DrawableNodeOptions } from '../drawableNode/drawableNode.types';

export interface Node2DOptions extends DrawableNodeOptions {
  scaleX: number;
  scaleY: number;
  rotation: number;
  positionX: number;
  positionY: number;
}
