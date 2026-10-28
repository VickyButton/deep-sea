import type { CanvasNodeOptions } from './canvasNode.types';
import { NodeBase } from '../nodeBase/NodeBase';

export class CanvasNode extends NodeBase {
  private _visible: boolean;
  private _zIndex: number;

  constructor(options: CanvasNodeOptions) {
    super(options);

    this._visible = options.visible;
    this._zIndex = options.zIndex;
  }

  public get visible() {
    return this._visible;
  }

  public set visible(visible: boolean) {
    this._visible = visible;
  }

  public get zIndex() {
    return this._zIndex;
  }

  public set zIndex(zIndex: number) {
    this._zIndex = zIndex;
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }
}
