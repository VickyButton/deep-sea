import type { NodeOptions } from '../node/node.types';

export interface CanvasNodeOptions extends NodeOptions {
  visible: boolean;
  zIndex: number;
}
