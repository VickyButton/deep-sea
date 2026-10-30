import type { NodeBaseOptions } from '../nodeBase/nodeBase.types';

export interface DrawableNodeOptions extends NodeBaseOptions {
  visible: boolean;
  zIndex: number;
}
