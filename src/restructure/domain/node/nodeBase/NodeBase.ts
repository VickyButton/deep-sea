import type { NodeBaseOptions } from './nodeBase.types';

export abstract class NodeBase {
  public readonly id: string;

  constructor(options: NodeBaseOptions) {
    this.id = options.id;
  }
}
