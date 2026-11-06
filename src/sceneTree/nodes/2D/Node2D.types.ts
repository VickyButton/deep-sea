import type { CanvasNodeOptions } from '../main/CanvasNode.types';

export interface Node2DOptions extends CanvasNodeOptions {
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  scale: {
    x: number;
    y: number;
  };
}
