import type { DrawableNodeOptions } from './drawableNode.types';
import { NodeBase } from '../nodeBase/NodeBase';

/** A node that can be drawn onto a canvas. */
export class DrawableNode extends NodeBase {
  private _visible: boolean;
  private _zIndex: number;

  constructor(options: DrawableNodeOptions) {
    super(options);

    this._visible = options.visible;
    this._zIndex = options.zIndex;
  }

  /** The node's local visibility. */
  public get visible() {
    return this._visible;
  }

  public set visible(visible: boolean) {
    this._visible = visible;
  }

  /** The node's local z-index. */
  public get zIndex() {
    return this._zIndex;
  }

  public set zIndex(zIndex: number) {
    this._zIndex = zIndex;
  }

  /** Turns off the node's visibility. */
  public hide() {
    this.visible = false;
  }

  /** Turns on the node's visibility. */
  public show() {
    this.visible = true;
  }
}
