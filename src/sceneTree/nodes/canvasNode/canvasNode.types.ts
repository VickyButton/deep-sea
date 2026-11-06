import type { NodeOptions } from '../node.types';

export interface CanvasNodeOptions extends NodeOptions {
  visible: boolean;
  zIndex: number;
}
