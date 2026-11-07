import type { CanvasNodeOptions } from './CanvasNode.types';
import { Node } from './Node';

/** A node that can draw to a canvas. */
export class CanvasNode extends Node {
  private _visible: boolean;
  private _zIndex: number;

  constructor(options: CanvasNodeOptions) {
    super(options);

    this._visible = options.visible ?? CanvasNode.VISIBLE_DEFAULT;
    this._zIndex = options.zIndex ?? CanvasNode.Z_INDEX_DEFAULT;
  }

  /** The node's local visibility. */
  public get visible() {
    return this._visible;
  }

  /**
   * Sets the node's local visibility.
   * @param visible The visibility to set the node's visibility to.
   */
  public set visible(visible: boolean) {
    this._visible = visible;
  }

  /** The node's local z-index. */
  public get zIndex() {
    return this._zIndex;
  }

  /**
   * Sets the node's local z-index.
   * @param zIndex The z-index to set the node's z-index to.
   */
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

  private static readonly VISIBLE_DEFAULT = true;
  private static readonly Z_INDEX_DEFAULT = 0;
}
