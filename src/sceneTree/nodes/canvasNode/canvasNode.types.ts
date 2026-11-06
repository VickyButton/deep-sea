import type { NodeOptions } from '../Node.types';

export interface CanvasNodeOptions extends NodeOptions {
  visible: boolean;
  zIndex: number;
}
