import type { NodeBaseOptions } from '../nodeBase/nodeBase.types';

export interface CanvasNodeOptions extends NodeBaseOptions {
  visible: boolean;
  zIndex: number;
}
